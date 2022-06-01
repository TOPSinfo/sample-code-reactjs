import { Polls } from "modules/utils/Firebase/Api";
import { eventChannel } from "redux-saga";
import firebase from "modules/utils/Firebase";

export const getPollsList = (organizationId: string) => {
  const pollRef = Polls.reference(organizationId);

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = pollRef.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (querySnapshot.docs) {
          return emit(querySnapshot.docs.map((x: any) => x.data()));
        } else return emit(false);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return connectionRoomListner;
};

export const deletePollsApi = async (payload: any) => {
  try {
    const pollRef = Polls.reference(payload.organizationId);
    await pollRef.doc(payload.id).delete();
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};
