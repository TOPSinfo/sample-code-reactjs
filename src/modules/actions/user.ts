import { createAction } from "redux-act";

export const authUser = createAction<any>();
export const authUserSuccess = createAction<any>();
export const authUserFailed = createAction<any>();
export const sendMailToResetPassword = createAction<any>();
export const setLoading = createAction();
export const signOutUser = createAction();
export const authLogOut = createAction();
export const authLoginErrors = createAction<any>();
export const authPasswordResetErrors = createAction<any>();

export const setLoungeData = createAction<any>("Set Lounge Data Success");
export const updatePassword = createAction<string>("Update Password");
export const updatedPasswordState = createAction<boolean>(
  "Updated Password state"
);
export const updatedPasswordError = createAction<string>(
  "Updated Password error"
);
export const updateProfile = createAction<any>();
export const updateProfileChangeSucess = createAction<any>();

// new admin panel actions

export const disableDashboardFrame = createAction<boolean>();
export const setDisableDashboardFrame = createAction<boolean>();
export const setExploDashboardData = createAction<any>();
export const setCustomToken = createAction<any>();
export const resetOrganizationData = createAction();
export const saveUserPreference = createAction();
