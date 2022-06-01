import { firestore } from "modules/utils/Firebase";

import { Profile, Sponsor } from "modules/utils/Firebase/Api";

import { toast } from "react-toastify";
export const addPartnerSponsorDetails = async (payload: any) => {
  const sponsors: any[] = [];
  try {
    const sponsorRef = Sponsor.reference(
      payload.organizationId,
      payload.eventId
    ).doc();

    const id = sponsorRef.id;

    if (payload.sponsorRepresentative.length > 0) {
      for (const item of payload.sponsorRepresentative) {
        sponsors.push(Profile.profile(item.id));
      }
    }

    await sponsorRef.set({
      name: payload.sponsorName,
      category: payload.category,
      mediaUrl: payload.media,
      title: payload.title,
      html: payload.companyDescription,
      logoUrl: payload.logoUrl,
      id,
      sponsors,
      company: payload.company ? payload.company : "",
      bgSponImageUrl: payload.bgSponImageUrl
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

export const getSponsorRepresentative = async (payload: any) => {
  try {
    const sponsorList: any[] = [];

    const participantRef = firestore.collection("Profiles");

    const snapshot = await participantRef
      .where("organizationId", "==", payload.organizationId)
      .where("roles", "==", "")
      .get();

    snapshot.forEach((doc) => {
      sponsorList.push(doc.data());
    });
    if (snapshot.empty) {
      return [];
    } else {
      return sponsorList;
    }
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const getSponsors = async (payload: any) => {
  try {
    const sponsorList: any[] = [];
    const sponsorRef = Sponsor.reference(
      payload.organizationId,
      payload.eventId
    );

    const snapshot = await sponsorRef.get();
    const sponsorDataList: any[] = [];

    snapshot.forEach(async (doc) => {
      const sponsor = doc.data();
      sponsorDataList.push(sponsor);
    });
    for (const sponsor of sponsorDataList) {
      const sponsorsRepList: any[] = [];
      if (sponsor.sponsors && sponsor.sponsors.length > 0) {
        for (const item of sponsor.sponsors) {
          let itemDetail = await item.get();
          itemDetail = await itemDetail.data();
          if (itemDetail) {
            const res = {
              id: itemDetail.uid,
              tag: itemDetail.firstName + " " + itemDetail.lastName
            };
            sponsorsRepList.push(res);
          }
        }
      }
      const sessionDoc = {
        id: sponsor.id,
        sponsorName: sponsor.name,
        category: sponsor.category,
        media: sponsor.mediaUrl,
        title: sponsor.title,
        companyDescription: sponsor.html,
        sponsorRepresentative: sponsorsRepList,
        logoUrl: sponsor.logoUrl,
        bgSponImageUrl: sponsor.bgSponImageUrl
      };
      sponsorList.push(sessionDoc);
    }
    if (snapshot.empty) {
      return [];
    } else {
      return sponsorList;
    }
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const updatePartnerSponsorDetails = async (payload: any) => {
  const sponsors: any[] = [];

  try {
    const sponsorRef = Sponsor.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    if (payload.sponsorRepresentative.length > 0) {
      for (const item of payload.sponsorRepresentative) {
        sponsors.push(Profile.profile(item.id));
      }
    }

    await sponsorRef.update({
      name: payload.sponsorName,
      category: payload.category,
      mediaUrl: payload.media,
      title: payload.title,
      html: payload.companyDescription ? payload.companyDescription : "",
      sponsors,
      logoUrl: payload.logoUrl ? payload.logoUrl : "",
      bgSponImageUrl: payload.bgSponImageUrl
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

export const deleteSponsor = async (payload: any) => {
  try {
    const sponsorRef = Sponsor.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);

    await sponsorRef.delete();
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
