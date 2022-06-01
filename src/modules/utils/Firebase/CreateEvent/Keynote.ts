import generateUid from "password-generator";
import { Keynote, Profile } from "modules/utils/Firebase/Api";
import { toast } from "react-toastify";
export const addKeynoteDetails = async (payload: any) => {
  const presenters: any[] = [];
  const moderators: any[] = [];
  try {
    const keynoteRef = Keynote.reference(
      payload.organizationId,
      payload.eventId
    ).doc();

    const roomUuid = generateUid(16, false);
    for (const item of payload.moderators) {
      moderators.push(Profile.profile(item.id));
    }
    for (const item of payload.presenters) {
      presenters.push(Profile.profile(item.id));
    }
    const id = keynoteRef.id;
    await keynoteRef.set({
      description: payload.description,
      title: payload.title,
      roomUuid,
      showSpeakers: payload.showPresenter,
      imageSrc: payload.detailsPageImage,
      type: payload.type,
      duration: payload.duration,
      id,
      card: {
        heading: payload.cardHeading,
        description: payload.cardDescription,
        background: {
          imageUrl: payload.cardBackgroundImage
        },
        className: payload.cardStyle
      },
      presenters,
      moderators,
      utcStartTimeMillis: payload.utcStartTimeMillis,
      timezone: payload.timezone
    });

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

export const getKeynoteDetails = async (payload: any) => {
  const keynoteList: any[] = [];
  try {
    const keynoteRef = Keynote.reference(
      payload.organizationId,
      payload.eventId
    );
    const keynoteDataList: any[] = [];
    const querySnapshot = await keynoteRef.get();
    console.log("getKeynoteDetails");

    querySnapshot.forEach(async (doc) => {
      const keynote = doc.data();
      keynoteDataList.push(keynote);
    });

    for (const keynote of keynoteDataList) {
      const presenters: any[] = [];
      const moderators: any[] = [];
      if (keynote.presenters && keynote.presenters.length > 0) {
        for (const item of keynote.presenters) {
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
      if (keynote.moderators && keynote.moderators.length > 0) {
        for (const item of keynote.moderators) {
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

      const keynoteDoc = {
        description: keynote.description,
        title: keynote.title,
        showPresenter: keynote.showSpeakers,
        cardHeading: keynote.card.heading,
        cardDescription: keynote.card.description,
        cardStyle: keynote.card.className,
        presenters,
        moderators,
        utcStartTimeMillis: keynote.utcStartTimeMillis,
        timezone: keynote.timezone ? keynote.timezone : "",
        duration: keynote.duration ? keynote.duration : "",
        detailsPageImage: keynote.imageSrc,
        cardBackgroundImage: keynote.card.background.imageUrl,
        type: keynote.type,
        id: keynote.id,
        roomUuid: keynote.roomUuid
      };

      keynoteList.push(keynoteDoc);
    }
    return keynoteList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return [];
  }
};

export const updateKeynotes = async (payload: any) => {
  const presenters: any[] = [];
  const moderators: any[] = [];
  try {
    const keynoteRef = Keynote.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    for (const item of payload.moderators) {
      moderators.push(Profile.profile(item.id));
    }
    for (const item of payload.presenters) {
      presenters.push(Profile.profile(item.id));
    }

    await keynoteRef.update({
      description: payload.description,
      title: payload.title,
      showSpeakers: payload.showPresenter,
      imageSrc: payload.detailsPageImage,
      type: payload.type,
      duration: payload.duration,
      card: {
        heading: payload.cardHeading,
        description: payload.cardDescription,
        background: {
          imageUrl: payload.cardBackgroundImage
        },
        className: payload.cardStyle
      },
      presenters,
      moderators,
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

export const deleteKeynote = async (payload: any) => {
  try {
    const keynoteRef = Keynote.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    await keynoteRef.delete();

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
