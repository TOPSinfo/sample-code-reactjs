import { createReducer } from "redux-act";
import {
  setCreateEventState,
  unMountCreateDEventState,
  setCreateEventErrorState,
  setEventFieldErrorState
} from "modules/actions";
import { CreateEventStateProps } from "modules/types/globals";
import firebase from "modules/utils/Firebase";

export interface ICreateEventReducerState {
  createdEventState: CreateEventStateProps;
  createdEventErrorState?: any;
  createdFieldEventErrorState: IFieldsError;
}

export interface IFieldsError {
  dateError: string;
}
const initialState: ICreateEventReducerState = {
  createdEventState: {
    name: "",
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    timezone: "",
    websiteUrl: "https://www.",
    access: {
      requiresRegistration: false,
      isSignInWithEmailRequired: false
    },
    id: "",
    status: "draft",
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    currentSelectedTab: "overview",
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
    organizationId: "",
    utcStartTimeMillis: 0
  },
  createdFieldEventErrorState: {
    dateError: ""
  }
};

export const createEventState = createReducer<ICreateEventReducerState>(
  {},
  initialState
);
createEventState.on(
  setCreateEventState,
  (state: ICreateEventReducerState, payload: CreateEventStateProps) => ({
    ...state,
    createdEventState: { ...payload }
  })
);

createEventState.on(
  unMountCreateDEventState,
  (state: ICreateEventReducerState) => ({
    ...state,
    createdEventState: { ...initialState.createdEventState },
    createdEventErrorState: {},
    createdFieldEventErrorState: { dateError: "" }
  })
);

createEventState.on(
  setCreateEventErrorState,
  (state: ICreateEventReducerState, payload: any) => ({
    ...state,
    createdEventErrorState: payload
  })
);

createEventState.on(
  setEventFieldErrorState,
  (state: ICreateEventReducerState, payload: IFieldsError) => ({
    ...state,
    createdFieldEventErrorState: { ...payload }
  })
);
