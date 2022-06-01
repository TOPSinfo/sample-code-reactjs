import { Event } from "modules/utils/Firebase/Api";
import {
  ConversationComponent,
  Lounge,
  AdminEventPeople
} from "../../../../modules/utils/Firebase/Api";
import { omit, omitBy, isUndefined } from "lodash";
import firebase from "../index";
import { toast } from "react-toastify";
import { firestore } from "modules/utils/Firebase";

export const saveConversationComponentApi = async (payload: any) => {
  try {
    const conversationComponentRef = ConversationComponent.reference(
      payload.organizationId,
      payload.conversationId
    ).doc(payload.id);
    const updatedPayload = omitBy(
      omit(payload, ["conversationId", "organizationId", "key"]),
      isUndefined
    );
    updatedPayload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    await conversationComponentRef.set(updatedPayload, { merge: true });
    return updatedPayload;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e))
    return false;
  }
};

export const setLoungeData = async (payload: any) => {
  try {
    const eventLounge = Lounge.reference(
      payload.organizationId,
      payload.conversationId
    );
    const presentLounge = await eventLounge.get().then((snapshot) => {
      const document = snapshot.docs.map((doc) => doc.data());
      return document;
    });
    const batchNetworking = firestore.batch();
    const totalTables = Number(payload?.meetingTables?.minTables);
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
    console.error(String(e))
    return false;
  }
};

export const saveSpeakerData = async (payload: any) => {
  try {
    const conversationRef = Event.docReference(
      payload.organizationId,
      payload.eventId
    );
    const docsIdRef = conversationRef.collection("speakers").doc();
    let obj = null;
    if (docsIdRef) {
      obj = {
        ...payload,
        id: payload.id ? payload.id : docsIdRef.id
      };
      const docId = payload.id ? payload.id : docsIdRef.id;
      await conversationRef
        .collection("speakers")
        .doc(docId)
        .set(obj, { merge: true });
    }
    return obj;
  } catch (e) {
    console.error(String(e))
  }
};

export const getPeopleData = async (result: any) => {
  const userUpdatedList: any[] = [];
  for (const userObj of result) {
    const userRef = AdminEventPeople.reference().doc(userObj.adminPeopleRefId);
    const snapShot = await userRef.get();
    const userData = snapShot.data();
    if (userData && !userData.isDeleted) {
      userData.id = snapShot.id;
      const obj = {
        ...userObj,
        user: userData
      };
      userUpdatedList.push(obj);
    }
  }
  return userUpdatedList;
};

export const deleteSpeakerPeople = async (payload: any) => {
  try {
    if (payload && payload.user) {
      const eventRef = AdminEventPeople.reference();
      const eventDoc = eventRef.doc(payload.user.id);
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
    console.error(String(e))
    return {
      error: true,
      message: e?.message || "You do not have sufficient permission.",
      showToaster: true
    };
  }
};

export const createConversation = async (payload: any) => {
  try {
    const conversationRef = Event.docReference(
      payload.organizationId,
      payload.eventId
    );

    const staticArray = [
      { componentType: "MEETING_ROOM", title: "Meeting Room" },
      {
        componentType: "NETWORKING_AREA",
        title: "Networking Lounge"
      },
      {
        componentType: "AGENDA",
        title: "Agenda"
      },
      {
        componentType: "BROADCAST_ROOM",
        title: "Broadcast Room"
      },
      {
        componentType: "LOBBY",
        title: "lobby"
      }
    ];

    if (payload.eventId && payload.organizationId) {
      const conversationObj = {
        ...payload,
        id: payload.eventId,
        type: "conversation",
        access: {
          requiresRegistration: false
        },
        status: "draft",
        timezone: payload.timezone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        theme: payload.theme,
        welcome: payload.welcome
      };

      await conversationRef.set(conversationObj);
    }
    const promises = staticArray.map(async (type) => {
      const docsIdRef = conversationRef.collection("components").doc();
      if (docsIdRef) {
        let obj = null;
        if (type.componentType === "MEETING_ROOM") {
          obj = {
            ...MeetingRoom,
            componentType: type.componentType,
            title: type.title,
            id: docsIdRef.id
          };
        }
        if (type.componentType === "BROADCAST_ROOM") {
          obj = {
            ...BroadcastRoom,
            componentType: type.componentType,
            title: type.title,
            id: docsIdRef.id
          };
        }
        if (type.componentType === "NETWORKING_AREA") {
          obj = {
            ...loungeData,
            id: docsIdRef.id,
            componentType: type.componentType,
            title: type.title
          };
        }
        if (type.componentType === "AGENDA") {
          obj = {
            id: docsIdRef.id,
            componentType: type.componentType,
            title: type.title
          };
        }
        if (type.componentType === "LOBBY") {
          obj = {
            id: docsIdRef.id,
            componentType: type.componentType,
            title: type.title
          };
        }
        if (obj) {
          await conversationRef
            .collection("components")
            .doc(docsIdRef.id)
            .set(obj);
        }
      }
    });
    await Promise.all(promises);
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

const BroadcastRoom = {
  capacity: 100,
  componentType: "BROADCAST_ROOM",
  durationMinutes: 50,
  title: "default title",
  type: "broadcast",

  visible: true,
  isHidden: false
};

const MeetingRoom = {
  capacity: 100,
  componentType: "MEETING_ROOM",
  durationMinutes: 60,
  title: "default title",
  type: "breakout",

  visible: true,
  isHidden: true
};

const loungeData = {
  capacity: 100,
  isLimitedCapacity: true,
  isHidden: true,
  meetingTables: {
    minTables: 4,
    capacity: 2
  },
  groupDiscuss: {
    maxGroupParticipant: 5,
    isLimitDiscussGroup: false,
    limitDicussionGroupTime: 10
  },
  subTitle: "",
  description: "",
  componentType: "NETWORKING_AREA",
  cardImg: "/assets/images/default/default_lounge.png"
};
