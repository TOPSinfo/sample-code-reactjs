import { eventChannel } from "redux-saga";
import firebase, { firestore, fieldValue } from "modules/utils/Firebase";
import Api from "modules/utils/Api";
import { AdminEventPeople } from "modules/utils/Firebase/Api";
import { UploadAvatar } from "modules/utils/FirebaseUpload";
import { omit } from "lodash";
import { getTrimmedObject } from "modules/utils/commonFn";

export const listPeople = async (payload: any) => {
  const userList: any[] = [];
  const participantRef = firestore.collection("AdminEventPeople");
  const snapshot = await participantRef
    .where("organizationId", "==", payload.organizationId)
    .where("isDeleted", "==", false)
    .get();

  snapshot.forEach(async (doc) => {
    if (doc.exists && !doc.data().isDeleted) {
      userList.push({
        ...doc.data(),
        id: doc.id,
        ref: doc.ref
      });
    }
  });
  if (snapshot.empty) {
    return [];
  } else {
    return userList;
  }
};

export const getPeopleList = (organizationId: string) => {
  const eventRef = AdminEventPeople.reference()
    .where("organizationId", "==", organizationId)
    .where("isDeleted", "==", false);
  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = eventRef.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (!querySnapshot.empty) {
          const userList: any[] = [];
          querySnapshot.forEach(async (doc) => {
            if (doc.exists && !doc.data().isDeleted) {
              userList.push({
                ...doc.data(),
                id: doc.id,
                ref: doc.ref
              });
            }
          });
          return emit(userList);
        } else return emit(false);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return connectionRoomListner;
};

// add admin user for organization
export const addPeople = async ({
  organizationId,
  firstName,
  lastName,
  email,
  profileStatus,
  organization = "",
  title = "",
  location = "",
  about = "",
  avatar = "",
  modifiedByUid,
  token
}: any) => {
  try {
    email = email.trim().toLowerCase();
    const eventRef = AdminEventPeople.reference();
    if (!organizationId) {
      return {
        error: true,
        message: "Organization Id is required.",
        showToaster: true
      };
    }
    const userSnapshot = await eventRef
      .where("email", "==", email)
      .where("organizationId", "==", organizationId)
      .get();
    const isUserActiveAlready =
      userSnapshot.docs.length === 0 ||
      userSnapshot.docs.map((x) => x.data()).filter((x) => !x.isDeleted)
        .length === 0;
    if (isUserActiveAlready) {
      const eventDoc =
        userSnapshot.docs.length === 0
          ? eventRef.doc()
          : eventRef.doc(userSnapshot.docs[0].id);
      if (avatar) {
        avatar = await getAvatarURL(avatar, eventDoc.id);
      }
      const requestPayload = getTrimmedObject({
        email,
        firstName,
        lastName,
        organizationId: organizationId || "",
        companyName: organization,
        jobTitle: title,
        workLocation: location,
        description: about,
        fromAdmin: true,
        status: "pending",
        profileStatus: profileStatus || "",
        avatar,
        createdAt: fieldValue.serverTimestamp(),
        updatedAt: fieldValue.serverTimestamp(),
        lastModifiedBy: modifiedByUid,
        id: eventDoc.id,
        isDeleted: false
      });
      await eventDoc.set(requestPayload, { merge: true });
      if (profileStatus === "invited") {
        // send email using pubsub
        await Api.peopleInvite(
          omit(requestPayload, ["createdAt", "updatedAt"]),
          token
        );
      }
      return {
        data: requestPayload
      };
    } else {
      return {
        error: true,
        message: "User already exist with same email id",
        showToaster: true
      };
    }
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
      showToaster: true
    };
  }
};

export const editPeople = async ({
  organizationId,
  firstName,
  lastName,
  email,
  profileStatus,
  organization = "",
  title = "",
  location = "",
  about = "",
  avatar = "",
  modifiedByUid,
  token
}: any) => {
  email = email.trim().toLowerCase();
  try {
    const eventRef = AdminEventPeople.reference();
    if (!organizationId) {
      return {
        error: true,
        message: "Organization Id is required.",
        showToaster: true
      };
    }
    const userSnapshot = await eventRef
      .where("email", "==", email)
      .where("organizationId", "==", organizationId)
      .get();
    if (userSnapshot.docs.length === 0) {
      return {
        error: true,
        message: "User does not exist",
        showToaster: true
      };
    } else {
      // update profile data
      const userId = userSnapshot.docs[0].id;
      const eventDoc = eventRef.doc(userId);
      if (avatar) {
        avatar = await getAvatarURL(avatar, eventDoc.id);
      }
      const requestPayload = getTrimmedObject({
        organizationId,
        firstName,
        lastName,
        companyName: organization,
        jobTitle: title,
        workLocation: location,
        description: about,
        avatar,
        updatedAt: fieldValue.serverTimestamp(),
        lastModifiedBy: modifiedByUid,
        email
      });
      await eventDoc.set(requestPayload, { merge: true });
      if (profileStatus === "invited") {
        // send email using pubsub
        Api.peopleInvite(
          omit({ ...requestPayload, peopleId: userId }, [
            "createdAt",
            "updatedAt"
          ]),
          token
        ).then((response: any) => {
          console.log("Success=== ", response);
        });
      }
      return {
        data: {
          ...requestPayload,
          id: userId
        }
      };
    }
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
      showToaster: true
    };
  }
};

export const deletePeople = async (payload: any) => {
  try {
    if (payload && payload.id) {
      const eventRef = AdminEventPeople.reference();
      const eventDoc = eventRef.doc(payload.id);
      await eventDoc.set(
        {
          isDeleted: true,
          roles: {}
        },
        { merge: true }
      );
      return {
        result: payload
      };
    }
    return {
      error: true,
      message: "id not found for deleting people",
      showToaster: true
    };
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
      showToaster: true
    };
  }
};

export const profileByEmail = async (payload: any) => {
  try {
    let { email, organizationId } = payload || {};
    if (!email || !organizationId) return;
    email = email.trim().toLowerCase();
    const profiles = await firestore
      .collection("Profiles")
      .where("organizationId", "==", organizationId)
      .where("email", "==", email)
      .get();
    const profile = profiles.docs && profiles.docs[0];
    if (profile && profile.exists) {
      return {
        data: profile.data()
      };
    }
    return {
      data: null
    };
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "Caught error while fetching profile by email",
      showToaster: true
    };
  }
};

const getAvatarURL = async (avatar: any, id: string) => {
  if (avatar && typeof avatar !== "string") {
    try {
      const fileName = id
        ? `${id}.${avatar?.name?.split(".")[1]}`
        : avatar?.name;
      const response: any = await UploadAvatar(fileName, avatar);
      return response;
    } catch (e) {
      console.error(String(e));
    }
  }
  return avatar;
};
