import { Event } from "modules/utils/Firebase/Api";
import { toast } from "react-toastify";

export const addWelcomePage = async (payload: any) => {
  try {
    const eventDoc = Event.docReference(
      payload.organizationId,
      payload.eventId
    );

    await eventDoc.update({
      welcome: {
        background: {
          imageUrl: payload.welBgImage
        },
        banner: {
          tagline: payload.welBannerTagline,
          imageUrl: payload.welBannerImage
        },
        hero: {
          title: payload.welHeroTitle,
          imageUrl: payload.welHeroImage
        },
        sponsors: {
          title: payload.welSponsorsTitle
        }
      },
      header: {
        imageUrl: payload.headerImage
      }
    });
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

export const getWelcomeDetails = async (
  organizationId: string,
  eventId: string
) => {
  try {
    const eventRef = Event.docReference(organizationId, eventId);
    const querySnapshot = await eventRef.get();
    const data = querySnapshot.data();
    const response = {
      welBannerTagline: data?.welcome?.banner?.tagline
        ? data.welcome.banner.tagline
        : "Event website URL",
      welBannerImage: data?.welcome?.banner?.imageUrl
        ? data.welcome.banner.imageUrl
        : "",
      welHeroTitle: data?.welcome?.hero?.title
        ? data.welcome.hero.title
        : "Welcome to",
      welSponsorsTitle: data?.welcome?.sponsors?.title
        ? data.welcome.sponsors.title
        : "Meet The Experts",
      welHeroImage: data?.welcome?.hero?.imageUrl
        ? data.welcome.hero.imageUrl
        : "",
      welBgImage: data?.welcome?.background?.imageUrl
        ? data.welcome.background.imageUrl
        : "",
      headerImage: data?.header?.imageUrl ? data.header.imageUrl : ""
    };
    return response;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return {};
  }
};
