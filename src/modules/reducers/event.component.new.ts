import { createReducer } from "redux-act";
import {
  fetchEventComponents,
  createEventComponentActions,
  unMountEventState,
  setDoubleClickEventComponentsRowSelected,
  setEventComponentsNew,
  setEventComponentsRowSelectedNew,
  setBroadcastChannel,
  setEventComponentViewType,
  setCurrentEventId,
  removeCurrentEventId,
  controlDoubleClick,
  createEventApi,
  createdEventSuccess
} from "../actions";
import {
  IBroadCastChannel,
  ICreateEventComponentProperty,
  IEventComponentsNew
} from "modules/types/globals";

export interface IEventComponentNewReducerState {
  eventComponents: IEventComponentsNew[];
  selectedRow: IEventComponentsNew | null;
  fetchingEventComp: boolean;
  eventComponentData: ICreateEventComponentProperty | any;
  isDoubleClicked: boolean;
  broadCastRoom?: IBroadCastChannel[];
  eventComponentViewType: string;
  eventId?: string;
  isCreatingEvent: boolean;
}
export const lobbyData = {
  page: {
    title: "Main Lobby"
  },
  keynotes: {
    expiredKeynoteText: "The session has ended",
    activeKeynoteText: "Join the session",
    showTimer: true,
    lobbyTitle: "Keynote Title",
    lobbyDescription: "Keynote Description",
    showKeynoteSection: true
  },
  sponsors: {
    page: {
      title: "Sponsors",
      bgImage: ""
    },
    action: {
      label: "Meet our Sponsors"
    }
  },
  sponsor: {
    page: {
      visitWebsite: {
        label: "VISIT WEBSITE"
      },
      followUp: {
        label: "REQUEST FOLLOW-UP"
      },
      sponsorLoungeBtn: {
        label: "SPONSOR LOUNGE"
      }
    },
    action: {
      label: "Meet our Sponsors"
    }
  },
  invite: {
    label: "Invite a colleague",
    placeholder: "email@example.com",
    showInvitee: false
  },
  action: {
    label: "Back to Lobby"
  },
  schedule: {
    action: {
      label: "Full Schedule"
    },
    page: {
      title: "Schedule"
    }
  }
};

export const leftCtaData = {
  name: "CallToAction",
  order: 0,
  title: "CTA left",
  componentType: "CALL_TO_ACTION",
  card: {
    html: "CTA left",
    openUrl: ""
  }
};

export const rightCtaData = {
  name: "TakeAssessment",
  order: 1,
  title: "CTA right",
  componentType: "CALL_TO_ACTION",
  card: {
    html: "CTA right",
    openUrl: ""
  }
};

const initialState: IEventComponentNewReducerState = {
  eventComponents: [],
  selectedRow: null,
  fetchingEventComp: false,
  isDoubleClicked: false,
  eventComponentData: {
    title: "",
    componentType: "",
    waitingImageSrc: "/assets/images/default/default_waitingR.jpg",
    backgroundImageSrc: "",
    isBoothVideo: false,
    visible: true,
    sponsorLoungeRedirectToBreakout: true,
    capacity: 100,
    isLimitedCapacity: true,
    meetingTables: {
      minTables: 4,
      capacity: 2,
      isNamedTable: false,
      meetingTableNames: []
    },
    breakoutRoom: {
      type: "none",
      attendeeReJoin: false
    },
    groupDiscuss: {
      maxGroupParticipant: 5,
      isLimitDiscussGroup: false,
      // isRandomMatch: true,
      // isGroupParticipant: false,
      limitDicussionGroupTime: 10
    },
    cardImg: "/assets/images/default/default_lounge.png",
    sponsorFollowupLabel: "REQUEST FOLLOW-UP",
    sponsorVisitWebsiteLabel: "VISIT WEBSITE",
    sponsorLoungeBtn: "SPONSOR LOUNGE"
  },
  eventComponentViewType: "list",
  isCreatingEvent: false
};

export const eventComponentNew = createReducer<IEventComponentNewReducerState>(
  {},
  initialState
);

eventComponentNew.on(
  setEventComponentsNew,
  (state: IEventComponentNewReducerState, payload: IEventComponentsNew[]) => ({
    ...state,
    fetchingEventComp: false,
    eventComponents: payload
  })
);

eventComponentNew.on(
  setEventComponentsRowSelectedNew,
  (
    state: IEventComponentNewReducerState,
    payload: IEventComponentsNew | null
  ) => ({
    ...state,
    selectedRow: payload
  })
);

eventComponentNew.on(
  fetchEventComponents,
  (state: IEventComponentNewReducerState) => ({
    ...state,
    fetchingEventComp: true
  })
);

eventComponentNew.on(
  createEventComponentActions,
  (
    state: IEventComponentNewReducerState,
    payload: IEventComponentsNew | any
  ) => {
    return {
      ...state,
      eventComponentData: payload
    };
  }
);

eventComponentNew.on(
  unMountEventState,
  (state: IEventComponentNewReducerState) => {
    return {
      ...state,
      eventComponentData: {
        ...initialState.eventComponentData
      }
    };
  }
);

eventComponentNew.on(
  setDoubleClickEventComponentsRowSelected,
  (
    state: IEventComponentNewReducerState,
    payload: { data: IEventComponentsNew | null; status: boolean }
  ) => ({
    ...state,
    selectedRow: payload.data,
    isDoubleClicked: payload.status
  })
);

eventComponentNew.on(
  setBroadcastChannel,
  (state: IEventComponentNewReducerState, payload: IBroadCastChannel[]) => ({
    ...state,
    broadCastRoom: payload
  })
);

eventComponentNew.on(
  setEventComponentViewType,
  (state: IEventComponentNewReducerState, payload: string) => ({
    ...state,
    eventComponentViewType: payload
  })
);

eventComponentNew.on(
  setCurrentEventId,
  (state: IEventComponentNewReducerState, payload: string) => ({
    ...state,
    eventId: payload
  })
);
eventComponentNew.on(
  removeCurrentEventId,
  (state: IEventComponentNewReducerState) => ({
    ...state,
    eventId: "",
    eventComponentData: []
  })
);

eventComponentNew.on(
  controlDoubleClick,
  (state: IEventComponentNewReducerState, payload: boolean) => ({
    ...state,
    isDoubleClicked: payload
  })
);

eventComponentNew.on(
  createEventApi,
  (state: IEventComponentNewReducerState) => ({
    ...state,
    isCreatingEvent: true
  })
);
eventComponentNew.on(
  createdEventSuccess,
  (state: IEventComponentNewReducerState, payload: boolean) => ({
    ...state,
    isCreatingEvent: payload
  })
);
