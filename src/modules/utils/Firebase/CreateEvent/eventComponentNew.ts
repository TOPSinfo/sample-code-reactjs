import { EventComponent, IVSData, Lounge } from "modules/utils/Firebase/Api";
import { omit, omitBy, isUndefined } from "lodash";
import firebase from "../index";
import { toast } from "react-toastify";
import { eventChannel } from "redux-saga";
import { firestore } from "modules/utils/Firebase";

export const saveEventComponentApi = async (payload: any) => {
  try {
    const eventComponentRef = EventComponent.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    const updatedPayload = omitBy(
      omit(payload, ["eventId", "organizationId", "key"]),
      isUndefined
    );
    updatedPayload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    await eventComponentRef.set(updatedPayload);
    return updatedPayload;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};
export const getEventComponentsApi = async (
  eventId: string,
  organizationId: string
) => {
  try {
    const eventComponentRef = EventComponent.reference(organizationId, eventId);
    const querySelectorData = await eventComponentRef.get();
    const eventComponentList: any = [];

    querySelectorData.forEach((resp) => {
      eventComponentList.push({ id: resp.id, ...resp.data() });
    });
    /* for (const data of eventComponentList) {
      listData.push(data);
    } */
    return eventComponentList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const deleteEventComponentApi = async (payload: any) => {
  try {
    const eventRef = EventComponent.reference(
      payload.organizationId,
      payload.eventId
    );
    const eventDoc = eventRef.doc(payload.id);
    await eventDoc.delete();
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

// export const getEventIVSData = async (payload: any) => {
//   try {
//     const eventIVSRef = IVSData.reference(
//       payload.organizationId,
//       payload.eventId
//     );
//     const ivs = await eventIVSRef.get();
//     return ivs.docs.map((x) => x.data());
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// };

export const getEventIVSData = (payload: any) => {
  const eventIVSRef = IVSData.reference(
    payload.organizationId,
    payload.eventId
  );

  const connectionIvsListner = eventChannel((emit) => {
    const unsubscribe = eventIVSRef.onSnapshot(
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
  return connectionIvsListner;
};

export const setLoungeData = async (payload: any) => {
  try {
    const eventLounge = Lounge.reference(
      payload.organizationId,
      payload.eventId
    );
    const presentLounge = await eventLounge.get().then((snapshot) => {
      const document = snapshot.docs.map((doc) => doc.data());
      return document;
    });
    const batchNetworking = firestore.batch();
    const totalTables = Number(payload.meetingTables.minTables);
    if (payload && payload.meetingTables && totalTables > 0) {
      if (presentLounge.length > totalTables) {
        const sorted = presentLounge.sort(
          (a, b) => b.created_at - a.created_at
        );
        for (let i = 0; i < sorted.length - totalTables; i++) {
          await eventLounge.doc(sorted[i].id).delete();
        }
      } else {
        const totalDataToAdd = totalTables - presentLounge.length;
        for (let i = 0; i < totalDataToAdd; i++) {
          const loungeRef = eventLounge.doc();
          const obj = {
            id: loungeRef.id,
            name: `Table${i + 1}`,
            isFixedRoom: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          };
          batchNetworking.set(loungeRef, obj);
        }
        await batchNetworking.commit();
      }
    }
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};
