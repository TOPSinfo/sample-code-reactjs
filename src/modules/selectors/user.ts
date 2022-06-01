import { IStoreState } from "modules/types";

export const getIsUserAuth = (state: IStoreState) => state.user.isAuth;
export const getUserProfile = (state: IStoreState) => state.user.profile;
export const getLoading = (state: IStoreState) => state.user.isLoading;
export const getLoginErrors = (state: IStoreState) => state.user.loginError;
export const getUserUid = (state: IStoreState) =>
  state.user.uid || state.user.profile.uid;
export const getOrganizationId = (state: IStoreState) =>
  state.user.organizationId;
export const getResetPasswordErrors = (state: IStoreState) =>
  state.user.resetPasswordError;
export const getFirebaseAccessToken = (state: IStoreState) =>
  state.user.firebaseToken;

export const getUserPasswordUpdateState = (state: IStoreState) =>
  state.user.profile.isPasswordSet;
export const getUserPasswordUpdateError = (state: IStoreState) =>
  state.user.updatePassError;

export const isDashboardframeEnabled = (state: IStoreState) =>
  state.user.profile?.isDashboardFrameDisabled;

export const getExploEmbedId = (state: IStoreState) =>
  state.user.exploEmbedId || "";
export const getExploToken = (state: IStoreState) =>
  state.user.exploToken || "";
export const getCustomToken = (state: IStoreState) => state.user.customToken;
export const getContractIds = (state: IStoreState) => state.user.contractIds;
