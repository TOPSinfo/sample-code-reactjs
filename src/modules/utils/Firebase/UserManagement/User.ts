import { firestore, fieldValue } from "modules/utils/Firebase";
import { Profile, Roles } from "modules/utils/Firebase/Api";
import { UploadAvatar } from "modules/utils/FirebaseUpload";
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import Api from "modules/utils/Api";
import moment from "moment-timezone";
moment.suppressDeprecationWarnings = true;
export const listUser = async (payload: any) => {
  const userList: any[] = [];
  const userUpdatedList: any[] = [];
  const participantRef = firestore.collection("Roles");
  const snapshot = await participantRef
    .where("contractIds", "array-contains", payload.contractId)
    .get();

  snapshot.forEach(async (doc) => {
    userList.push({ ...doc.data(), uid: doc.id });
  });
  if (userList && userList.length) {
    for (const userObj of userList) {
      const userRef = Profile.profile(userObj.uid);
      const snapfo = await userRef.get();
      const obj = {
        ...userObj,
        user: snapfo.data()
      };
      if (obj.user.updatedAt && obj.user.updatedAt.seconds)
        obj.user.updatedAt = moment(obj.user.updatedAt.seconds * 1000).unix();
      userUpdatedList.push(obj);
    }
  }
  if (snapshot.empty) {
    return [];
  } else {
    return userUpdatedList;
  }
};

export const getUserProfile = async (uid: string) => {
  const userRef = Profile.profile(uid);
  const user = await userRef.get();
  const userData: any = user.data();
  try {
    const data = await Roles.reference().doc(uid).get();
    if (data.exists) {
      const roleData: any = data.data();

      userData.organizationId = roleData.organizationId;
      userData.organizationIds = roleData?.organizationIds ?? [];
      userData.userRole = { ...roleData };
      userData.roles = roleData.roles;
      userData.contractIds = roleData?.contractIds ?? [];
      userData.lastSelection = roleData?.lastSelection ?? null;
    }
  } catch (e) {
    console.error(String(e));
  }
  return userData;
};

export const setDashboardFrame = async (uid: string, isDisabled: boolean) => {
  const userRef = Profile.profile(uid);
  try {
    await userRef.update({ isDashboardFrameDisabled: isDisabled });
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
  return true;
};

export const updateUser = async (userObj: any) => {
  return new Promise((resolve, reject) => {
    const userRef = Profile.profile(userObj.uid);
    userRef
      .update({
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        roles: userObj.role,
        email: userObj.email,
        imageSrc: userObj.imageSrc
      })
      .then(() => {
        resolve(true);
      })
      .catch(function (error) {
        console.error(String(error));
        reject(error);
      });
  });
};

export const updateUserProfile = async (userObj: any) => {
  try {
    if (userObj.avatar) {
      userObj.avatar = await getAvatarURL(
        userObj.avatar,
        userObj.modifiedByUid
      );
    }
    const userRef = await Profile.profile(userObj.modifiedByUid);
    let requestPayload: any = {
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      jobTitle: userObj.title,
      email: userObj.email,
      companyName: userObj.organization,
      workLocation: userObj.location,
      about: userObj.about,
      linkedin: userObj.linkedin,
      twitter: userObj.twitter,
      avatar: userObj.avatar
    };
    requestPayload = omitBy(requestPayload, isUndefined);
    console.log("requestPayload", requestPayload);
    await userRef.update(requestPayload);
    return userObj;
  } catch (e) {
    console.error(String(e));
    throw new Error(String(e));
  }
};

export const updateChangePasswordStatus = async (userObj: {
  uid: string;
  isPasswordSet: boolean;
}) => {
  return new Promise((resolve, reject) => {
    const userRef = Profile.profile(userObj.uid);
    userRef
      .update({
        isPasswordSet: userObj.isPasswordSet
      })
      .then(() => {
        resolve(true);
      })
      .catch(function (error) {
        console.error(String(error));
        reject(error);
      });
  });
};

export const saveLastUserSelection = async (
  uid: string,
  contractId: string,
  organizationId: string
) => {
  const roleRef = Roles.reference().doc(uid);
  try {
    await roleRef.update({
      lastSelection: { contractId, organizationId }
    });
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const deleteUser = async (userId: string) => {
  return new Promise((resolve, reject) => {
    const userRef = Profile.profile(userId);
    userRef
      .delete()
      .then(() => {
        resolve(true);
      })
      .catch(function (error) {
        console.error(String(error));
        reject(error);
      });
  });
};

// add admin user for organization
export const addAdminUser = async (payload: any) => {
  try {
    const requestPayload = {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      organizationId: payload.organizationId ? payload.organizationId : "",
      roles: payload.roles
    };
    return await Api.adminRegister(requestPayload, payload.token);
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
      showToaster: true
    };
  }
};

export const editAdminUser = async (payload: any) => {
  try {
    const requestPayload = {
      organizationId: payload.organizationId ? payload.organizationId : "",
      organizationIds: fieldValue.arrayUnion(payload?.organizationId ?? ""),
      contractIds: fieldValue.arrayUnion(payload?.contractId ?? ""),
      roles: payload.roles,
      uid: payload.uid
    };

    await Roles.reference().doc(payload.uid).update(requestPayload);

    payload.updatedAt = new Date().getTime() / 1000;
    const userRef = Profile.profile(payload.uid);
    await userRef.update({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      updatedAt: fieldValue.serverTimestamp(),
      lastModifiedBy: payload.modifiedByUid
    });
    return true;
  } catch (e) {
    console.error(String(e));
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
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
