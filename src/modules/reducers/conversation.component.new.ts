import { createReducer } from "redux-act";
import {
  fetchConversationComponents,
  createConversationComponentActions,
  unMountConversationState,
  setDoubleClickConversationComponentsRowSelected,
  setConversationComponentsNew,
  setConversationComponentsRowSelectedNew,
  setConversationComponentViewType,
  setCurrentConversationId,
  removeCurrentConversationId,
  controlDoubleClick,
  createConversationApi,
  createdConversationSuccess,
  createConversationSpeakerActions,
  setFecthedPeopleUserList,
  removeTeamPeople
} from "../actions";
import {
  IBroadCastChannel,
  ICreateConversationComponentProperty,
  IConversationComponentsNew
} from "modules/types/globals";

export interface IConversationComponentNewReducerState {
  conversationComponents: IConversationComponentsNew[];
  selectedRow: IConversationComponentsNew | null;
  fetchingConversationComp: boolean;
  conversationComponentData: ICreateConversationComponentProperty | any;
  conversationSpeakerData: any;
  isDoubleClicked: boolean;
  broadCastRoom?: IBroadCastChannel[];
  conversationComponentViewType: string;
  conversationId?: string;
  userList: any;
  isCreatingConversation: boolean;
}

const initialState: IConversationComponentNewReducerState = {
  conversationComponents: [],
  selectedRow: null,
  fetchingConversationComp: false,
  isDoubleClicked: false,
  conversationComponentData: {
    title: "",
    componentType: "",
    waitingImageSrc: "/assets/images/default/default_waitingR.jpg",
    isBoothVideo: false,
    sponsorLoungeRedirectToBreakout: true,
    capacity: 100,
    isLimitedCapacity: true,
    meetingTables: {
      minTables: 4,
      capacity: 2,
      isNamedTable: false,
      meetingTableName: ""
    },
    groupDiscuss: {
      maxGroupParticipant: 5,
      isLimitDiscussGroup: false,
      limitDicussionGroupTime: 10
    },
    card: {
      html: ""
    },
    cardImg: "/assets/images/default/default_lounge.png",
    sponsorFollowupLabel: "REQUEST FOLLOW-UP",
    sponsorVisitWebsiteLabel: "VISIT WEBSITE",
    sponsorLoungeBtn: "SPONSOR LOUNGE"
  },
  conversationSpeakerData: {
    adminPeopleRefId: "",
    id: "",
  },
  userList: [],
  conversationComponentViewType: "list",
  isCreatingConversation: false
};

export const conversationComponentNew = createReducer<IConversationComponentNewReducerState>(
  {},
  initialState
);

conversationComponentNew.on(
  setConversationComponentsNew,
  (state: IConversationComponentNewReducerState, payload: IConversationComponentsNew[]) => ({
    ...state,
    fetchingConversationComp: false,
    conversationComponents: payload
  })
);

conversationComponentNew.on(
  setConversationComponentsRowSelectedNew,
  (
    state: IConversationComponentNewReducerState,
    payload: IConversationComponentsNew | null
  ) => ({
    ...state,
    selectedRow: payload
  })
);

conversationComponentNew.on(
  fetchConversationComponents,
  (state: IConversationComponentNewReducerState) => ({
    ...state,
    fetchingConversationComp: true
  })
);

conversationComponentNew.on(
  createConversationComponentActions,
  (
    state: IConversationComponentNewReducerState,
    payload: IConversationComponentsNew | any
  ) => {
    return {
      ...state,
      conversationComponentData: payload
    };
  }
);

conversationComponentNew.on(
  unMountConversationState,
  (state: IConversationComponentNewReducerState) => {
    return {
      ...state,
      conversationComponentData: {
        ...initialState.conversationComponentData
      }
    };
  }
);

conversationComponentNew.on(
  setDoubleClickConversationComponentsRowSelected,
  (
    state: IConversationComponentNewReducerState,
    payload: { data: IConversationComponentsNew | null; status: boolean }
  ) => ({
    ...state,
    selectedRow: payload.data,
    isDoubleClicked: payload.status
  })
);


conversationComponentNew.on(
  setConversationComponentViewType,
  (state: IConversationComponentNewReducerState, payload: string) => ({
    ...state,
    conversationComponentViewType: payload
  })
);

conversationComponentNew.on(
  setCurrentConversationId,
  (state: IConversationComponentNewReducerState, payload: string) => ({
    ...state,
    conversationId: payload
  })
);
conversationComponentNew.on(
  removeCurrentConversationId,
  (state: IConversationComponentNewReducerState) => ({
    ...state,
    conversationId: "",
    conversationComponentData: []
  })
);

conversationComponentNew.on(
  controlDoubleClick,
  (state: IConversationComponentNewReducerState, payload: boolean) => ({
    ...state,
    isDoubleClicked: payload
  })
);

conversationComponentNew.on(
  createConversationApi,
  (state: IConversationComponentNewReducerState) => ({
    ...state,
    isCreatingConversation: true
  })
);
conversationComponentNew.on(
  createdConversationSuccess,
  (state: IConversationComponentNewReducerState, payload: boolean) => ({
    ...state,
    isCreatingConversation: payload
  })
);

conversationComponentNew.on(
  createConversationSpeakerActions,
  (state: IConversationComponentNewReducerState, payload: any) => ({
    ...state,
    conversationSpeakerData: payload
  })
);

conversationComponentNew.on(
  setFecthedPeopleUserList,
  (state: IConversationComponentNewReducerState, payload: any) => ({
    ...state,
    userList: payload
  })
);

conversationComponentNew.on(removeTeamPeople, (state: IConversationComponentNewReducerState, payload: any) => ({
  ...state,
  userList: removeUserFromList(state.userList, payload)
}));

const removeUserFromList = (userlist: any[], payload: any) => {
  return userlist.filter((value) => value.id !== payload.id);
};



