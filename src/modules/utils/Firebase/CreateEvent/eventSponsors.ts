import { omit } from "lodash";
import { Event } from "../Api";

export const fetchEventSponsors = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = eventRef.doc(payload.eventId).collection("sponsors");
    const querySnapshot = await eventDoc.get();
    const SponsorsList: any[] = [];

    querySnapshot.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id
      };
      SponsorsList.push(obj);
    });
    return SponsorsList;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const saveNewSponsorApi = async (payload: any) => {
  try {
    if (payload && payload.id && payload.eventId) {
      const eventRef = Event.reference(payload.organizationId);
      const updatedPayload = omit(payload, ["eventId", "organizationId"]);
      const eventDoc = eventRef
        .doc(payload.eventId)
        .collection("sponsors")
        .doc(payload.id);
      await eventDoc.set(updatedPayload);
      return payload;
    }
  } catch (e) {
    console.error(String(e));
  }
};
export const removeSponsorApi = async (payload: any) => {
  try {
    if (payload && payload.id && payload.eventId) {
      const eventRef = Event.reference(payload.organizationId);
      const eventDoc = eventRef
        .doc(payload.eventId)
        .collection("sponsors")
        .doc(payload.id);
      await eventDoc.delete();
    }
  } catch (e) {
    console.error(String(e));
  }
};
