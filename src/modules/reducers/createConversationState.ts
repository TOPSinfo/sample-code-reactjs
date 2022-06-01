import firebase from "modules/utils/Firebase";
import { createReducer } from "redux-act";
import { CreateConversationStateProps } from "modules/types/globals";
import {
  setCreateConversationState,
  unMountCreateDConversationState,
  setCreateConversationErrorState,
  setConversationFieldErrorState
} from "modules/actions";

export interface ICreateConversationReducerState {
  createdConversationState: CreateConversationStateProps;
  createdConversationErrorState?: any;
  createdFieldConversationErrorState: IFieldError;
}

export interface IFieldError {
  dateError: string;
}
const initialState: ICreateConversationReducerState = {
  createdConversationState: {
    name: "",
    title: "",
    subTitle: "",
    description: "",
    startDate: "",
    videoPlatform: "shared_studios",
    componentType: "",
    roomType: "BROADCAST_ROOM",
    isConversationLounge: false,
    isDisabled: true,
    timezone: "",
    startTime: "",
    thirdPartyUrl: "https://www.",
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
    theme: {
      fillColorOverlay: "",
      fillColorOpacity: "0.5",
      sidePanelTextColor: "#ffffff",
      buttonColor: "#1a1a1a",
      bannerColor: "",
      bannerColorOpacity: "0.5",
      landingBannerTextColor: "#ffffff"
    },
    id: "",
    status: "draft",
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    currentSelectedTab: "overview",
    organizationId: "",
    access: {
      requiresRegistration: false,
      isSignInWithEmailRequired: false
    }
  },
  createdFieldConversationErrorState: {
    dateError: ""
  }
};

export const createConversationState =
  createReducer<ICreateConversationReducerState>({}, initialState);

createConversationState.on(
  setCreateConversationState,
  (
    state: ICreateConversationReducerState,
    payload: CreateConversationStateProps
  ) => ({
    ...state,
    createdConversationState: { ...payload }
  })
);

createConversationState.on(
  unMountCreateDConversationState,
  (state: ICreateConversationReducerState) => ({
    ...state,
    createdConversationState: { ...initialState.createdConversationState },
    createdConversationErrorState: {},
    createdFieldConversationErrorState: { dateError: "" }
  })
);

createConversationState.on(
  setCreateConversationErrorState,
  (state: ICreateConversationReducerState, payload: any) => ({
    ...state,
    createdConversationErrorState: payload
  })
);

createConversationState.on(
  setConversationFieldErrorState,
  (state: ICreateConversationReducerState, payload: IFieldError) => ({
    ...state,
    createdFieldConversationErrorState: { ...payload }
  })
);
