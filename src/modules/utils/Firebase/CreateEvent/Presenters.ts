import { firestore } from "modules/utils/Firebase";
import { Profile } from "../Api";
import { toast } from "react-toastify";
export const getPresenterList = async (payload: any) => {
  try {
    const presenterList: any[] = [];

    const participantRef = firestore.collection("Profiles");
    const snapshotPresenter = await participantRef
      .where("organizationId", "==", payload.organizationId)
      .where("type", "==", "presenter")
      .get();
    snapshotPresenter.forEach((doc) => {
      presenterList.push(doc.data());
    });

    return presenterList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const getModeratorList = async (payload: any) => {
  try {
    const moderatorList: any[] = [];

    const participantRef = firestore.collection("Profiles");

    const snapshotModerator = await participantRef
      .where("organizationId", "==", payload.organizationId)
      .where("type", "==", "moderator")
      .get();
    snapshotModerator.forEach((doc) => {
      moderatorList.push(doc.data());
    });

    return moderatorList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const getPresenterById = async (payload: any) => {
  try {
    const userRef = Profile.profile(payload.uid);
    const user = await userRef.get();
    return user.data();
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const updatePresenterById = async (payload: any) => {
  return new Promise((resolve, reject) => {
    const userRef = Profile.profile(payload.uid);
    userRef
      .update({
        firstName: payload.firstName,
        lastName: payload.lastName,
        company: payload.company,
        title: payload.title,
        description: payload.description,
        imageSrc: payload.imageSrc
      })
      .then(() => {
        resolve(true);
      })
      .catch(function (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
        reject(error);
      });
  });
};
