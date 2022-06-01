import { Image, Video, Recording, EventComponent } from "modules/utils/Firebase/Api";
import { omit } from "lodash";
import firebase, { fieldValue } from "modules/utils/Firebase";
import { eventChannel } from "redux-saga";

export const addFileToDb = async (payload: any) => {
  try {
    // const ref = Video.reference(payload.organizationId).doc();
    const videoRef = Video.reference(payload.organizationId);
    const imageRef = Image.reference(payload.organizationId);
    const obj = omit(payload, ["organizationId"]);
    // obj.id = ref.id;
    obj.updatedAt = fieldValue.serverTimestamp();
    obj.createdAt = fieldValue.serverTimestamp();
    if (payload.type === "Video") await videoRef.doc(payload.id).set(obj);
    else await imageRef.doc(payload.id).set(obj);
    return true;
  } catch (e) {
    console.error(String(e))
    return false;
  }
};

export const fetchContentFile = async (payload: any) => {
  try {
    const fileList: any[] = [];
    const videoRef = Video.reference(payload);
    const imageRef = Image.reference(payload);
    let data = await videoRef.get();
    data.forEach((doc) => {
      fileList.push(doc.data());
    });
    data = await imageRef.get();
    data.forEach((doc) => {
      fileList.push(doc.data());
    });
    return fileList;
  } catch (e) {
    console.error(String(e))
    return false;
  }
};

export const deleteContentApi = async (payload: any) => {
  try {
    const videoRef = Video.reference(payload.organizationId);
    const imageRef = Image.reference(payload.organizationId);
    if (payload.type === "Video") await videoRef.doc(payload.id).delete();
    else if (payload.type === "Image") await imageRef.doc(payload.id).delete();
    return true;
  } catch (e) {
    console.error(String(e))
    return false;
  }
};

export const fetchRecordingApi = async (organizationId: string) => {
  const recordingRef = Recording.reference();
  const connectionIvsListner = eventChannel((emit) => {
    const unsubscribe = recordingRef
      .where("organizationId", "==", organizationId)
      .orderBy("processedUrl")
      .onSnapshot(async (querySnapshot: firebase.firestore.QuerySnapshot) => {
        const recordingData: any[] = [];

        querySnapshot.forEach((doc) => {
          recordingData.push(doc.data());
        });

        const promises = recordingData.map(async (data) => {
          const EventComponentRef = EventComponent.reference(
            data.organizationId,
            data.eventId
          ).doc(data.roomId);
          const EventComponentData = await EventComponentRef.get();
          return { ...EventComponentData.data(), ...data };
        });
        const roomData = await Promise.all(promises);
        emit(roomData);
      });
    return () => {
      unsubscribe();
    };
  });
  return connectionIvsListner;
};
