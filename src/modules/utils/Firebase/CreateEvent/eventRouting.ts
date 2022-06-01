import { Routing } from "modules/utils/Firebase/Api";
import firebase from "modules/utils/Firebase";

export const checkEventNameExist = async (
  eventId: string,
  eventName: string
) => {
  try {
    const eventRoutingRef = Routing.reference();
    const querySnapshot = await eventRoutingRef
      .where("friendlyUrl", "==", eventName)
      .get();
    let data: any = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
        data = { ...doc.data(), id: doc.id };
      });
      return data?.eventId ? data?.eventId !== eventId : !!data;
    }
    return false;
  } catch (e) {
    console.error(String(e));
    return [];
  }
};

export const getEventFriendlyName = async (eventId: string) => {
  const eventRoutingRef = Routing.reference();
  const friendlyRoutingRef = eventRoutingRef.where("eventId", "==", eventId);
  const data = await friendlyRoutingRef.get();
  const eventdata: any = [];

  data.forEach((x) => {
    eventdata.push({
      ...x.data(),
      id: x.id
    });
  });
  return eventdata.length > 0 ? eventdata[0] : null;
};

export const saveEventFriendlyName = async (
  eventId: string,
  orgId: string,
  eventName: string,
  eventUrl: string,
  startTime: string
) => {
  try {
    const eventRoutingRef = Routing.reference();
    const friendlyRoutingRef = eventRoutingRef.doc();
    let dataId = friendlyRoutingRef.id;
    const querySnapshot = await eventRoutingRef
      .where("organizationId", "==", orgId)
      .where("eventId", "==", eventId)
      .get();

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
        dataId = doc.id;
      });
    }

    await eventRoutingRef.doc(dataId).set(
      {
        id: dataId,
        friendlyUrl: eventName,
        type: "days",
        eventId: eventId,
        organizationId: orgId,
        days: {
          [startTime]: eventUrl
        }
      },
      { merge: true }
    );
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const deleteEventName = async (eventId: string) => {
  try {
    const eventRoutingRef = Routing.reference();

    const querySnapshot = await eventRoutingRef
      .where("eventId", "==", eventId)
      .get();
    querySnapshot.forEach(async (doc: firebase.firestore.DocumentSnapshot) => {
      const data = doc.data();
      if (data) await eventRoutingRef.doc(data.friendlyUrl).delete();
    });
    return true;
  } catch (e) {
    console.error(String(e));
    return [];
  }
};
