import {
  Event,
  Keynote,
  Components,
  Users,
  EventComponent,
  EventGroupComponent
  // Routing
} from "modules/utils/Firebase/Api";
import { firestore, fieldValue } from "..";
import UploadFile from "../../FirebaseUpload";
import moment from "moment-timezone";
import EventStatus from "../../event.status";
import omitBy from "lodash/omitBy";
import omit from "lodash/omit";
import isNil from "lodash/isNil";
import isUndefined from "lodash/isUndefined";
import firebase from "modules/utils/Firebase";
import { toast } from "react-toastify";
moment.suppressDeprecationWarnings = true;
export const eventList = async (organizationId: string) => {
  const eventsList: any[] = [];
  try {
    const eventRef = Event.reference(organizationId);

    const querySnapshot = await eventRef.get();
    querySnapshot.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id
      };
      eventsList.push(obj);
    });
    return eventsList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const updateEventbriteDetails = async (
  organizationId: string,
  eventId: string,
  eventbriteId: any
) => {
  const eventRef = Event.docReference(organizationId, eventId);

  await eventRef.update({
    connectors: {
      eventbrite: eventbriteId
    }
  });
};

export const addEventPageDetails = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = payload.eventId
      ? eventRef.doc(payload.eventId)
      : eventRef.doc();
    await eventDoc.set(
      {
        id: eventDoc.id,
        days: payload.days,
        timezone: payload.timezone,
        eventName: payload.eventName,
        websiteUrl: payload.eventWebsite,
        lounges: {
          isSponsorLoungeActive: false
        },
        status: EventStatus.DRAFT,
        updatedAt: fieldValue.serverTimestamp(),
        isDeleted: false
      },
      { merge: true }
    );
    return eventDoc.id;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const getEventDetails = async (
  organizationId: string,
  eventId: string
) => {
  try {
    const eventRef = Event.docReference(organizationId, eventId);
    const querySnapshot = await eventRef.get();
    const data = querySnapshot.data();
    return {
      days: data?.days,
      eventName: data?.eventName,
      eventWebsite: data?.websiteUrl,
      timezone: data?.timezone
    };
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return {};
  }
};

export const addSponsorTypesDb = async (payload: any) => {
  const db = firestore
    .collection("Events")
    .doc(payload.organizationId)
    .collection("events")
    .doc(payload.eventId);
  try {
    const batch = firestore.batch();

    payload.sponsorTypes.forEach((doc: any) => {
      const docRef = db.collection("sponsorTypes").doc(); // automatically generate unique id
      batch.set(docRef, doc);
    });
    await batch.commit();
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const updateEventStatusApi = async (payload: any) => {
  try {
    const batch = firestore.batch();
    const doc = firestore
      .collection("Events")
      .doc(payload.organizationId)
      .collection("events");

    const snapshot = await doc.where("id", "in", payload.selectedEvent).get();

    snapshot.forEach((doc) => {
      batch.update(doc.ref, { status: payload.status });
    });
    await batch.commit();
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const deleteEventApi = async (payload: any) => {
  try {
    const batch = firestore.batch();
    const doc = firestore
      .collection("Events")
      .doc(payload.organizationId)
      .collection("events");

    const snapshot = await doc
      .where(
        "id",
        "in",
        payload.selectedEvent.map((x: any) => x.id)
      )
      .get();
    snapshot.forEach((doc) => {
      batch.update(doc.ref, { isDeleted: true });
    });
    await batch.commit();
    return true;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};

// =========================================================new fiebase fn================

export const saveNewEventApi = async (payload: any) => {
  try {
    if (payload && payload.id) {
      const eventRef = Event.reference(payload.organizationId);
      const eventDoc = eventRef.doc(payload.id);
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      await eventDoc.set(payload);
    }
  } catch (e) {
    console.error(String(e));
  }
};
export const updateNewEventApi = async (payload: any) => {
  try {
    if (payload && payload.id) {
      const eventRef = Event.reference(payload.organizationId);
      const eventDoc = eventRef.doc(payload.id);
      const updatedPayload = omit(omitBy(payload, isNil), "createdAt");
      await eventDoc.update(updatedPayload);
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const updateNewKeynoteApi = async (payload: any) => {
  try {
    if (payload && payload.id && payload.keynote.id) {
      const keynoteRef = Keynote.reference(payload.organizationId, payload.id);
      const keynoteDoc = keynoteRef.doc(payload.id);
      await keynoteDoc.update([payload.keynote]);
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const createNewEventApi = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    // const Uuid = generateUid(16, false);
    const eventDoc = eventRef.doc(payload.UUID);
    const filePath = `/dynamic/images/${payload.organizationId}/Event/${payload.UUID}/`;
    const uploadImges = [];
    if (typeof payload.bannerImageFile !== "string")
      uploadImges.push({
        key: "bannerImage",
        file: payload.bannerImageFile,
        filePath
      });

    if (typeof payload.hostImage !== "string")
      uploadImges.push({
        key: "hostImage",
        file: payload.hostImage,
        filePath
      });

    if (typeof payload.welBgImgFile !== "string")
      uploadImges.push({
        key: "welBgImgFile",
        file: payload.welBgImgFile,
        filePath
      });

    if (typeof payload.welBannerImgFile !== "string")
      uploadImges.push({
        key: "welBannerImgFile",
        file: payload.welBannerImgFile,
        filePath
      });

    if (typeof payload.heroImageFile !== "string")
      uploadImges.push({
        key: "heroImageFile",
        file: payload.heroImageFile,
        filePath
      });

    if (typeof payload.headerImgFile !== "string")
      uploadImges.push({
        key: "headerImgFile",
        file: payload.headerImgFile,
        filePath
      });

    const allUpload: any = [];

    uploadImges.forEach((x) => {
      allUpload.push(UploadFile(x.filePath, x.file, x.key, ""));
    });

    const resp = await Promise.all(allUpload);
    const eventData: any = {
      welcome: {
        banner: {
          tagline: payload.tagline
        },
        hero: {
          title: payload.heroTitle
        },
        sponsors: {
          title: "Sponsored by",
          visible: false,
          list: []
        }
      },
      header: {
        titleHtml: payload.titleHtml
      },
      schedule: {
        action: {
          label: payload.schedLabel
        },
        globalLink: payload.globalLink,
        page: {
          keynoteTitle: payload.keynoteTitle,
          keynotesTabTitle: payload.keynoteTabTitle,
          title: payload.pageTitle
        }
      },
      datetime: moment(payload.startDate).utc().format("MM/DD/YYYY, hh:mm a"),
      name: payload.title,
      organizationId: payload.organizationId,
      updatedAt: fieldValue.serverTimestamp(),
      utcStartTimeMillis: moment(payload.startDate).unix(),
      status: payload.published?.attendeePortal
        ? EventStatus.OPENED
        : EventStatus.DRAFT,
      isDeleted: false,
      websiteUrl: payload.websiteUrl,
      published: payload.published,
      createdAt: fieldValue.serverTimestamp(),
      attendeeRegistaration: payload.attendeeRegistaration,
      subTitle: payload.subTitle,
      description: payload.description,
      timezone: payload.timezone,
      startTime: moment(payload.startTime).format("HH:mm:ss"),
      lounges: payload.lounges,
      conference: {
        isChatActive: payload.isChatActive,
        sponsorDisplayInKeynote: payload.sponsorDisplayInKeynote,
        sponsorTypeText: payload.sponsorTypeText
      },
      theme: {
        buttonColor: payload.buttonColor
      }
    };
    resp.forEach((d: any) => {
      if (d.key === "headerImgFile")
        eventData.header = {
          imageUrl: d.fileUrl
        };
      else if (d.key === "heroImageFile")
        eventData.welcome.hero = {
          imageUrl: d.fileUrl
        };
      else if (d.key === "welBannerImgFile")
        eventData.welcome.banner = {
          imageUrl: d.fileUrl
        };
      else if (d.key === "welBgImgFile")
        eventData.welcome.background = {
          imageUrl: d.fileUrl
        };
      else eventData[d.key] = d.fileUrl;
    });
    await eventDoc.set(eventData);
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const deleteEventsApi = async (payload: any) => {
  const eventData: any = {
    isDeleted: true,
    deletedAt: fieldValue.serverTimestamp()
  };
  const eventRef = Event.reference(payload.organizationId);
  const eventDoc = eventRef.doc(payload.id);
  await eventDoc.update(eventData);
  // Routing.reference()
  //   .get()
  //   .then(async (snap) => {
  //     const routeArray = snap.docs.map((doc) => doc.data());
  //     const find = routeArray.find((rout) => rout.eventId === payload.id);
  //     if (find) Routing.reference().doc(find.friendlyUrl).delete();
  //   });
  return true;
};

export const restoreEventsApi = async (payload: any) => {
  const eventData: any = {
    isDeleted: false,
    restoredAt: fieldValue.serverTimestamp()
  };
  const eventRef = Event.reference(payload.organizationId);
  const eventDoc = eventRef.doc(payload.id);
  await eventDoc.update(eventData);
  return true;
};

export const updateEventApi = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = eventRef.doc(payload.id);
    let resp = null;
    const uploadImges: any[] = [];
    const filePath = `/dynamic/images/${payload.organizationId}/`;
    const eventData: any = {
      welcome: {
        banner: {
          tagline: payload.tagline
        },
        hero: {
          title: payload.heroTitle
        },
        sponsors: {
          title: "Sponsored by",
          visible: false,
          list: []
        }
      },
      header: {
        titleHtml: payload.titleHtml
      },
      datetime: moment(payload.startDate).utc().format("MM/DD/YYYY, hh:mm a"),
      name: payload.title,
      organizationId: payload.organizationId,
      updatedAt: fieldValue.serverTimestamp(),
      utcStartTimeMillis: moment(payload.startDate).unix(),
      status: payload.published?.attendeePortal
        ? EventStatus.OPENED
        : EventStatus.DRAFT,
      isDeleted: false,
      websiteUrl: payload.websiteUrl,
      published: payload.published,
      attendeeRegistaration: payload.attendeeRegistaration,
      subTitle: payload.subTitle,
      description: payload.description,
      timezone: payload.timezone,
      startTime: moment(payload.startTime).format("HH:mm:ss"),
      lounges: payload.lounges,
      schedule: {
        action: {
          label: payload.schedLabel
        },
        globalLink: payload.globalLink,
        page: {
          keynoteTitle: payload.keynoteTitle,
          keynotesTabTitle: payload.keynoteTabTitle,
          title: payload.pageTitle
        }
      },
      conference: {
        isChatActive: payload.isChatActive,
        sponsorDisplayInKeynote: payload.sponsorDisplayInKeynote,
        sponsorTypeText: payload.sponsorTypeText
      },
      theme: {
        buttonColor: payload.buttonColor
      }
    };
    if (typeof payload.bannerImageFile !== "string") {
      uploadImges.push({
        key: "bannerImage",
        file: payload.bannerImageFile,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });
    }
    if (typeof payload.hostImage !== "string") {
      uploadImges.push({
        key: "hostImage",
        file: payload.hostImage,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });
    }
    if (typeof payload.welBgImgFile !== "string")
      uploadImges.push({
        key: "welBgImgFile",
        file: payload.welBgImgFile,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });

    if (typeof payload.welBannerImgFile !== "string")
      uploadImges.push({
        key: "welBannerImgFile",
        file: payload.welBannerImgFile,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });

    if (typeof payload.heroImageFile !== "string")
      uploadImges.push({
        key: "heroImageFile",
        file: payload.heroImageFile,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });

    if (typeof payload.headerImgFile !== "string")
      uploadImges.push({
        key: "headerImgFile",
        file: payload.headerImgFile,
        filePath: filePath + "Event/",
        storePath: "/Event/"
      });

    if (uploadImges && uploadImges.length > 0) {
      const allUpload: any = [];
      uploadImges.forEach((x) => {
        allUpload.push(UploadFile(x.filePath, x.file, x.key, x.storePath));
      });
      resp = await Promise.all(allUpload);
      resp.forEach((d: any) => {
        if (d.key === "headerImgFile")
          eventData.header = {
            imageUrl: d.fileUrl
          };
        else if (d.key === "heroImageFile")
          eventData.welcome.hero = {
            imageUrl: d.fileUrl
          };
        else if (d.key === "welBannerImgFile")
          eventData.welcome.banner = {
            imageUrl: d.fileUrl
          };
        else if (d.key === "welBgImgFile")
          eventData.welcome.background = {
            imageUrl: d.fileUrl
          };
        else eventData[d.key] = d.fileUrl;
      });
    }

    await eventDoc.update(eventData);
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const renameEventNameApi = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = eventRef.doc(payload.eventId);
    const eventData: any = {
      name: payload.name
    };
    await eventDoc.update(eventData);
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const fetchEventSponsorTypes = async (payload: any) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = eventRef.doc(payload.eventId).collection("sponsorTypes");
    const querySnapshot = await eventDoc.get();
    const SponsorsTypesList: any[] = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id
      };
      SponsorsTypesList.push(obj);
    });
    return SponsorsTypesList;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};
export const saveNewSponsorTypeApi = async (payload: any) => {
  try {
    if (payload && payload.id && payload.eventId) {
      const eventRef = Event.reference(payload.organizationId);
      const eventDoc = eventRef
        .doc(payload.eventId)
        .collection("sponsorTypes")
        .doc(payload.id);
      await eventDoc.set(payload);
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const saveNewCTACardApi = async (
  payload: any,
  organizationId: string,
  eventId: string
) => {
  try {
    if (payload && payload.id) {
      const componentRef = Components.reference(organizationId, eventId);
      const obj = {
        ...payload,
        id: payload.id
      };
      await componentRef.doc(payload.id).set(obj);
      return payload;
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const removeNewCTACardApi = async (
  payload: any,
  organizationId: string,
  eventId: string
) => {
  try {
    if (payload && payload.id) {
      const componentRef = Components.reference(organizationId, eventId);
      await componentRef.doc(payload.id).delete();
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const fetchEventCTACardApi = async (payload: any) => {
  try {
    const componentRef = Components.reference(
      payload.organizationId,
      payload.eventId
    );
    const querySnapshot = await componentRef.get();
    const EventCTAcardList: any[] = [];

    querySnapshot.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id
      };
      EventCTAcardList.push(obj);
    });
    return EventCTAcardList;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const fetchUserFromEmails = async (organizationId: string) => {
  try {
    const querySnapshot = await Users.reference()
      .where("organizationId", "==", organizationId)
      .get();
    const users: any[] = [];

    querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
      const data = doc.data();
      if (doc.exists && data && !data?.isDeleted) {
        data.id = doc.id;
        data.ref = doc.ref;
        users.push(data);
      }
    });
    return users;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const copyEventApi = async (payload: any, oldEventId: string) => {
  try {
    const eventRef = Event.reference(payload.organizationId);
    const eventDoc = eventRef.doc(payload.id);
    const newPayload = omitBy(omitBy(payload, isNil), isUndefined);
    await eventDoc.set({
      ...newPayload,
      createdAt: fieldValue.serverTimestamp()
    });
    const allComponents = await EventComponent.reference(
      payload.organizationId,
      oldEventId
    ).get();

    try {
      allComponents.docs.forEach(async (comp: any) => {
        const component = comp.data();
        const newComponentRef = EventComponent.reference(
          payload.organizationId,
          payload.id
        ).doc();
        const id = newComponentRef.id;
        await newComponentRef.set({ ...component, id });
      });
    } catch (e) {
      console.error(e);
    }
    return true;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      // closeOnClick: true,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const createEvent = async (obj: any) => {
  try {
    const createEventStaticData = firebase
      .functions()
      .httpsCallable("adminCreateEvent");
    const response = await createEventStaticData(obj);
    return response;
  } catch (e) {
    console.error(String(e));
    return e;
  }
};

export const fetchGroupList = async (payload: any) => {
  try {
    const eventGroupRef = EventGroupComponent.reference(
      payload.organizationId,
      payload.eventId
    );
    const querySnapshot = await eventGroupRef.get();
    const groupsList: any[] = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id
      };
      groupsList.push(obj);
    });
    return groupsList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return {};
  }
};

export const saveGroupData = async (payload: any) => {
  try {
    const eventGroupRef = EventGroupComponent.reference(
      payload.organizationId,
      payload.eventId
    );
    const docsIdRef = eventGroupRef.doc();
    const eventDoc = eventGroupRef.doc(docsIdRef.id);
    const obj: any = {
      id: docsIdRef.id,
      name: payload.name,
      duration: 50,
      isCheckedPolls: payload.isCheckedPolls ? payload.isCheckedPolls : false
    };
    if (!payload.id) {
      obj.users = [];
    }
    await eventDoc.set(obj, { merge: true });
    return obj;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return {};
  }
};

export const EditGroupData = async (payload: any) => {
  try {
    const eventGroupRef = EventGroupComponent.reference(
      payload.organizationId,
      payload.eventId
    );
    const eventDoc = eventGroupRef.doc(payload.id);
    const obj: any = {
      id: payload.id,
      name: payload.name,
      duration: 50,
      isCheckedPolls: payload.isCheckedPolls ? payload.isCheckedPolls : false
    };

    await eventDoc.set(obj, { merge: true });
    return obj;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return {};
  }
};
