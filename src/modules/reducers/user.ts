import { createReducer } from "redux-act";
import {
  authUserFailed,
  authUserSuccess,
  authLogOut,
  setLoading,
  authLoginErrors,
  authPasswordResetErrors,
  updatedPasswordState,
  updatedPasswordError,
  updateProfileChangeSucess,
  // new actions
  setDisableDashboardFrame,
  setExploDashboardData,
  setCustomToken
} from "modules/actions/user";

export interface IUserTrack {
  createdAt: string;
  id: string;
  registered: boolean;
}

export interface IUserProfile {
  uid: string;
  displayName: string;
  givenName: string;
  firstName: string;
  lastName: string;
  company?: string;
  workLocation?: string;
  email: string;
  photoUrl: string;
  avatar: string;
  isAdmin: boolean;
  isTwilioUser: boolean;
  name: string;
  tracks: ITracks[];
  roles: string[];
  isLoungeRegistered?: boolean;
  isDashboardFrameDisabled: boolean;
  isPasswordSet: boolean;
  role: string;
  title: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  imageSrc: string;
  about:string;
  location:string;
  organization:string;
  jobTitle:string;
  companyName?: string;
}

export interface IUserProfileToken {
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
  expiry?: number;
}

export interface IUserReducer {
  isAuth: boolean;
  isLinkInvalid: boolean;
  profile: IUserProfile;
  error?: string;
  isLoading: boolean;
  loginError?: string;
  eventId: string;
  organizationId: string;
  apiKey: string;
  firebaseToken: string;
  uid?: string;
  resetPasswordError?: string;
  room?: string;
  jitsiToken?: string;
  exploEmbedId: string;
  exploToken: string;
  isUserInLounge: boolean;
  updatePassError: string;
  profileImageUploadedStatus: boolean;
  isOrgUserFetching: boolean;
  customToken?: any;
  contractIds: string[];
}

export interface ITracks {
  roomUuid: string;
  utcStartTimeMillis: number;
  title: string;
}

const initialState = {
  isAuth: false,
  isLinkInvalid: false,
  profile: {
    uid: "",
    displayName: "",
    givenName: "",
    firstName: "",
    lastName: "",
    company: "",
    workLocation: "",
    isLoungeRegistered: false,
    email: "",
    name: "",
    tracks: [],
    photoUrl: "",
    avatar: "",
    roles: [],
    isAdmin: false,
    isTwilioUser: false,
    isPasswordSet: false,
    role: "",
    title: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    isDashboardFrameDisabled: false,
    imageSrc: "",
    about:"",
    location:"",
    companyName:"",
    organization:"",
    jobTitle:""
  },
  eventId: "",
  organizationId: "",
  exploEmbedId: "",
  exploToken: "",
  apiKey: "",
  firebaseToken: "",
  isLoading: false,
  error: "",
  room: "",
  jitsiToken: "",
  isUserInLounge: false,
  updatePassError: "",
  profileImageUploadedStatus: false,
  contractIds: [],
  isOrgUserFetching: false
};

export const user = createReducer<IUserReducer>({}, initialState);
user.on(authUserSuccess, (state: IUserReducer, payload: any) => ({
  ...state,
  organizationId: payload?.organizationId ?? state?.organizationId,
  contractIds: payload?.contractIds ?? state?.contractIds,
  firebaseToken: payload?.firebaseToken ?? state?.firebaseToken,
  profile: payload?.profile ?? state?.profile,
  uid: payload?.uid ?? state?.uid,
  isAuth: true,
  isLoading: false,
  customToken: null
}));
user.on(setExploDashboardData, (state: IUserReducer, payload: any) => ({
  ...state,
  exploEmbedId: payload.exploEmbedId,
  exploToken: payload.exploToken
}));

user.on(authUserFailed, (state: IUserReducer, payload?: string) => ({
  ...state,
  error: payload,
  isLoading: false
}));

user.on(setLoading, (state: IUserReducer) => ({
  ...state,
  isLoading: true
}));

user.on(authLogOut, () => initialState);

user.on(authLoginErrors, (state: IUserReducer, payload?: string) => ({
  ...state,
  loginError: payload,
  isLoading: false
}));

user.on(authPasswordResetErrors, (state: IUserReducer, payload: string) => ({
  ...state,
  resetPasswordError: payload,
  isLoading: false
}));

user.on(setDisableDashboardFrame, (state: IUserReducer, payload: boolean) => ({
  ...state,
  profile: {
    ...state.profile,
    isDashboardFrameDisabled: payload
  }
}));

user.on(updatedPasswordState, (state: IUserReducer, payload: boolean) => ({
  ...state,
  profile: { ...state.profile, isPasswordSet: payload }
}));

user.on(updatedPasswordError, (state: IUserReducer, payload: string) => ({
  ...state,
  updatePassError: payload
}));

user.on(
  updateProfileChangeSucess,
  (state: IUserReducer, payload: IUserProfile) => ({
    ...state,
    profile: {
      ...state.profile,
      firstName: payload.firstName,
      lastName: payload.lastName,
      jobTitle: payload.title,
      twitter: payload.twitter,
      linkedin: payload.linkedin,
      email: payload.email,
      avatar: payload.avatar,
      about: payload.about,
      workLocation: payload.location,
      companyName:payload.organization
    }
  })
);

user.on(setCustomToken, (state: IUserReducer, payload: any) => ({
  ...state,
  customToken: payload
}));
