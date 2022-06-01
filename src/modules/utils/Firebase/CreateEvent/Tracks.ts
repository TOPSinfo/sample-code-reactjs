import { firestore } from "modules/utils/Firebase";
import generateUid from "password-generator";
import { Event, Track, Session, Profile } from "modules/utils/Firebase/Api";
import { toast } from "react-toastify";
// tracks create-event
export const addTracksDetails = async (payload: any) => {
  try {
    const trackRef = Track.reference(
      payload.organizationId,
      payload.eventId
    ).doc();

    const roomUuid = generateUid(16, false);
    const id = trackRef.id;

    await trackRef.set(
      {
        title: payload.trackName,
        roomUuid,
        duration: payload.duration,
        longDescription: payload.about,
        imageUrl: payload.trackImageFilename,
        order: payload.orderInLobby,
        id,
        utcStartTimeMillis: payload.utcStartTimeMillis,
        timezone: payload.timezone
      },
      { merge: true }
    );
    payload.id = id;
    return payload;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const addSessionsDetails = async (payload: any) => {
  const presenters: any[] = [];
  const moderators: any[] = [];
  try {
    const sessionRef = Session.reference(
      payload.organizationId,
      payload.eventId
    ).doc();
    const id = sessionRef.id;

    for (const item of payload.moderators) {
      moderators.push(Profile.profile(item.id));
    }
    for (const item of payload.presenters) {
      presenters.push(Profile.profile(item.id));
    }

    await sessionRef.set({
      id,
      title: payload.sessionTitle,
      description: payload.sessionDescription,
      capacity: payload.capacity,
      presenters,
      moderators,
      track: payload.trackName,
      utcStartTimeMillis: payload.utcStartTimeMillis,
      timezone: payload.timezone,
      trackId: payload.trackId
    });

    const tracks = await Track.reference(
      payload.organizationId,
      payload.eventId
    )
      .doc(payload.trackId)
      .get();
    const sessions = tracks.data()?.sessions ? tracks.data()?.sessions : [];

    sessions.push(
      firestore.doc(
        "/Events/" +
        payload.organizationId +
        "/events/" +
        payload.eventId +
        "/sessions/" +
        id
      )
    );

    await Track.reference(payload.organizationId, payload.eventId)
      .doc(payload.trackId)
      .set(
        {
          sessions
        },
        { merge: true }
      );
    payload.id = id;
    return payload;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};

export const getTracksDetails = async (payload: any) => {
  const trackList: any[] = [];

  return new Promise((resolve, reject) => {
    const trackRef = Track.reference(payload.organizationId, payload.eventId);
    trackRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const track = doc.data();
          const trackDoc = {
            trackName: track.title,
            duration: track.duration,
            about: track.longDescription,
            trackImageFilename: track.imageUrl,
            orderInLobby: track.order,
            id: doc.id,
            utcStartTimeMillis: track.utcStartTimeMillis
              ? track.utcStartTimeMillis
              : 0,
            timezone: track.timezone ? track.timezone : ""
          };
          trackList.push(trackDoc);
        });
        resolve(trackList);
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

export const getSessionsDetails = async (payload: any) => {
  const sessionList: any[] = [];
  try {
    const sessionRef = Session.reference(
      payload.organizationId,
      payload.eventId
    );
    const sessionDataList: any[] = [];
    const querySnapshot = await sessionRef
      .where("trackId", "==", payload.trackId)
      .get();
    querySnapshot.forEach(async (doc) => {
      const session = doc.data();
      sessionDataList.push(session);
    });

    for (const session of sessionDataList) {
      const presenters: any[] = [];
      const moderators: any[] = [];

      if (session.presenters && session.presenters.length > 0) {
        for (const item of session.presenters) {
          let itemDetail = await item.get();
          itemDetail = itemDetail.data();
          if (itemDetail) {
            const res = {
              id: itemDetail.uid,
              tag: itemDetail.firstName + " " + itemDetail.lastName
            };
            presenters.push(res);
          }
        }
      }
      if (session.moderators && session.moderators.length > 0) {
        for (const item of session.moderators) {
          let itemDetail = await item.get();
          itemDetail = itemDetail.data();
          if (itemDetail) {
            const res = {
              id: itemDetail.uid,
              tag: itemDetail.firstName + " " + itemDetail.lastName
            };
            moderators.push(res);
          }
        }
      }

      const sessionDoc = {
        id: session.id,
        sessionTitle: session.title,
        sessionDescription: session.description,
        capacity: session.capacity,
        presenters,
        moderators,
        trackName: session.track,
        utcStartTimeMillis: session.utcStartTimeMillis
          ? session.utcStartTimeMillis
          : 0,
        timezone: session.timezone ? session.timezone : "",
        trackId: session.trackId
      };

      sessionList.push(sessionDoc);
    }
    return sessionList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const updateTracksDetails = async (payload: any) => {
  try {
    const eventRef = Event.docReference(
      payload.organizationId,
      payload.eventId
    );
    const trackRef = eventRef.collection("tracks").doc(payload.id);

    await trackRef.update({
      title: payload.trackName,
      duration: payload.duration,
      longDescription: payload.about,
      imageUrl: payload.trackImageFilename,
      order: payload.orderInLobby,
      utcStartTimeMillis: payload.utcStartTimeMillis,
      timezone: payload.timezone
    });
    return payload;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};

export const updateSessionsDetails = async (payload: any) => {
  const presenters: any[] = [];
  const moderators: any[] = [];
  try {
    const sessionRef = Session.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    for (const item of payload.moderators) {
      moderators.push(Profile.profile(item.id));
    }
    for (const item of payload.presenters) {
      presenters.push(Profile.profile(item.id));
    }
    await sessionRef.update({
      title: payload.sessionTitle,
      description: payload.sessionDescription,
      capacity: payload.capacity,
      presenters,
      moderators,
      track: payload.trackName,
      utcStartTimeMillis: payload.utcStartTimeMillis,
      timezone: payload.timezone,
      trackId: payload.trackId
    });
    return payload;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};

export const deleteTracks = async (payload: any) => {
  try {
    const trackRef = Track.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    const trackDoc = (await trackRef.get()).data();

    if (trackDoc?.sessions && trackDoc.sessions.length > 0) {
      for (const item of trackDoc.sessions) {
        await Session.reference(payload.organizationId, payload.eventId)
          .doc(item.id)
          .delete();
      }
    }

    await trackRef.delete();
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

export const deleteSessions = async (payload: any) => {
  try {
    const sessionRef = Session.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);
    await sessionRef.delete();
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
