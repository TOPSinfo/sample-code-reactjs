import { useState } from "react";
import firebase from "modules/utils/Firebase";
interface AttendeeRegistrationProps {
  requiresRegistration: boolean;
  isSignInWithEmailRequired: boolean;
}

interface PublishedModalProps {
  attendeePortal: boolean;
  microSite: boolean;
  tollWithtopsApi: boolean;
}

interface EventLoungesProps {
  gLButton: string;
  gLDescription: string;
  gLText: string;
  isActive: boolean;
  isSponsorLoungeActive: boolean;
  vipButton: string;
  vipDescription: string;
  vipText: string;
}

export interface EventKeynotesProps {
  title: string;
  type: string;
  description: string;
  cardName: string;
  caption: string;
  cardDescription: string;
  className: string;
  capacity: number;
  duration: number;
  cardBdImg: any;
  startDate: string;
  startTime: string;
  keynoteData: IKeynoteApiData;
}

interface IKeynoteApiData {
  title: string;
  description: string;
  card: {
    background: {
      imageUrl: string;
    };
    heading: string;
    description: string;
  };
  caption: string;
  durationMinutes: number;
  capacity: number;
  _startDate: string;
  _startTime: string;
  utcStartTimeMillis: number | null;
}
interface IEventWelcomeProps {
  background: {
    imageUrl: string;
  };
  banner: {
    tagline: string;
    imageUrl: string;
  };
  hero: {
    title: string;
    imageUrl: string;
  };
  sponsors: {
    title: string;
    visible: boolean;
    list: any[];
  };
  favicon: {
    imageUrl: string;
  };
}

interface IEventHeaderProps {
  titleHtml: string;
  imageUrl: any;
}

interface IThemeHeaderProps {
  fillColorOverlay: string;
  fillColorOpacity: string;
}

interface IScheduleProps {
  action: {
    label: string;
  };
  page: {
    title: string;
  };
}
interface ISponsorProps {
  page: {
    followUp: {
      label: string;
    };
    visitWebsite: {
      label: string;
    };
    sponsorLoungeBtn: {
      label: string;
    };
  };
}
interface ISponsorsProps {
  label: string;
  page: {
    title: string;
  };
}
interface IConferenceProps {
  isChatActive: boolean;
  sponsorDisplayInKeynote: boolean;
  sponsorTypeText: string;
}
interface IInviteProps {
  label?: string;
  placeholder?: string;
}

interface IEventKeynoteProps {
  activeKeynoteText: string;
  expiredKeynoteText: string;
  showSpeakers: boolean;
  showTimer: boolean;
  lobbyTitle: string;
  lobbyDescription: string;
}
interface ILobbyProps {
  action: {
    label?: string;
  };
  keynote: IEventKeynoteProps;
}
export interface CreateEventProps {
  name: string;
  title: string;
  description: string;
  bannerImage: string;
  hostImage: any;
  startDate: string;
  startTime: string;
  timezone: any;
  status: string;
  websiteUrl: string;
  access: AttendeeRegistrationProps;
  id?: string;
  published: PublishedModalProps;
  tagline: string;
  heroTitle: string;
  lounges: EventLoungesProps;
  schedLabel: string;
  globalLink: string;
  keynoteTitle: string;
  keynoteTabTitle: string;
  pageTitle: string;
  buttonColor: string;
  isChatActive: boolean;
  sponsorDisplayInKeynote: boolean;
  sponsorTypeText: string;
  currentSelectedTab: string;
  updatedAt: any;
  createdAt: any;
  keynote: IKeynoteApiData;
  welcome: IEventWelcomeProps;
  header: IEventHeaderProps;
  theme: IThemeHeaderProps;
  conference: IConferenceProps;
  schedule: IScheduleProps;
  sponsor: ISponsorProps;
  sponsors: ISponsorsProps;
  invite: IInviteProps;
  lobby: ILobbyProps;
  defineComponentType: IDefineComponentType;
}

interface IDefineComponentType {
  name: string;
  type: string;
}

export interface IFieldsError {
  dateError: string;
}
export const useCrateEventState = () => {
  const defaultState: CreateEventProps = {
    name: "",
    title: "",
    description: "",
    bannerImage: "",
    hostImage: "",
    startDate: "",
    startTime: "",
    timezone: "",
    websiteUrl: "https://www.",
    access: {
      requiresRegistration: false,
      isSignInWithEmailRequired: false
    },
    id: "",
    published: {
      attendeePortal: false,
      microSite: false,
      tollWithtopsApi: false
    },
    header: {
      titleHtml: "",
      imageUrl: ""
    },
    tagline: "",
    heroTitle: "",
    status: "draft",
    lounges: {
      gLButton: "",
      gLDescription: "",
      gLText: "",
      isActive: false,
      isSponsorLoungeActive: false,
      vipButton: "",
      vipDescription: "",
      vipText: ""
    },
    schedLabel: "",
    globalLink: "",
    keynoteTitle: "",
    keynoteTabTitle: "",
    pageTitle: "",
    buttonColor: "",
    isChatActive: false,
    sponsorDisplayInKeynote: false,
    sponsorTypeText: "",
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    currentSelectedTab: "overview",
    keynote: {
      title: "",
      description: "",
      card: {
        background: {
          imageUrl: ""
        },
        heading: "",
        description: ""
      },
      caption: "",
      durationMinutes: 0,
      capacity: 0,
      _startDate: "",
      _startTime: "",
      utcStartTimeMillis: 0
    },
    welcome: {
      background: {
        imageUrl: "/assets/images/default/default_welcome.jpg"
      },
      banner: {
        tagline: "",
        imageUrl: ""
      },
      hero: {
        title: "",
        imageUrl: ""
      },
      sponsors: {
        title: "",
        visible: false,
        list: []
      },
      favicon: {
        imageUrl: ""
      }
    },
    conference: {
      isChatActive: false,
      sponsorDisplayInKeynote: false,
      sponsorTypeText: ""
    },
    theme: {
      fillColorOverlay: "",
      fillColorOpacity: "0.5"
    },
    invite: {
      label: "",
      placeholder: ""
    },
    schedule: {
      action: {
        label: ""
      },
      page: {
        title: ""
      }
    },
    sponsor: {
      page: {
        followUp: {
          label: ""
        },
        visitWebsite: {
          label: ""
        },
        sponsorLoungeBtn: {
          label: ""
        }
      }
    },
    sponsors: {
      label: "",
      page: {
        title: ""
      }
    },
    lobby: {
      action: {
        label: ""
      },
      keynote: {
        activeKeynoteText: "Join the session",
        expiredKeynoteText: "The session has ended",
        showSpeakers: false,
        showTimer: false,
        lobbyTitle: "",
        lobbyDescription: ""
      }
    },
    defineComponentType: {
      name: "",
      type: ""
    }
  };

  const defaultError: IFieldsError = {
    dateError: ""
  };
  const [eventState, setEventState] = useState(defaultState);
  const [isSubmited, setSubmited] = useState(false);
  const [errorEventState, setErrorEventState] = useState({
    ...defaultState,
    websiteUrl: ""
  });
  const [errFieldsState, setErrorFieldState] = useState(defaultError);
  return {
    eventState,
    setEventState,
    errorEventState,
    setErrorEventState,
    isSubmited,
    setSubmited,
    setErrorFieldState,
    errFieldsState
  };
};
