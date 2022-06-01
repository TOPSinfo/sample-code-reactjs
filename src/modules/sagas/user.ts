import { SagaIterator } from "redux-saga";
import { call, select, put, take } from "redux-saga/effects";

import {
  getOrganizationId,
  getUserUid,
  getContractId
} from "modules/selectors";
import {
  authUserFailed,
  authUserSuccess,
  authLogOut,
  setLoading,
  authLoginErrors,
  authPasswordResetErrors,
  updatedPasswordError,
  updatedPasswordState,
  updateProfileChangeSucess,
  setDisableDashboardFrame,
  setExploDashboardData,
  setCustomToken,
  fetchOrganizationsByContractId,
  setModalLoading,
  setProfileModalState,
  setContractId
} from "modules/actions";
import { ISagaAction } from "modules/types";
import FireBaseAuth from "modules/utils/Firebase/Auth";
import {
  getUserProfile,
  setDashboardFrame,
  updateChangePasswordStatus,
  updateUserProfile,
  saveLastUserSelection
} from "modules/utils/Firebase/UserManagement/User";
import { toast } from "react-toastify";
import firebase from "firebase/app";

export const signInUser = function* (action: ISagaAction<any>): SagaIterator {
  try {
    const FirseBaseAuthClient = new FireBaseAuth();
    const rolesResponse = yield call(
      FirseBaseAuthClient.checkExistingRoles,
      action.payload.email
    );
    if (rolesResponse.data && rolesResponse.data.data.status) {
      yield call(
        FirseBaseAuthClient.signInUser,
        action.payload.email,
        action.payload.password,
        action.payload.keepSignedIn
      );
    } else {
      toast.error(rolesResponse.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      throw new Error(rolesResponse.message);
    }
  } catch (e) {
    console.error(String(e));
    yield put(authLoginErrors(e.message));
  }
};
export const disableDashboardFrame = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const userId = yield select(getUserUid);
    yield call(setDashboardFrame, userId, action.payload);
    yield put(setDisableDashboardFrame(action.payload));
  } catch (e) {
    console.error(String(e));
  }
};

export const saveUserPreferenceSaga = function* (): SagaIterator {
  try {
    const userId = yield select(getUserUid);
    const contractId = yield select(getContractId);
    const organizationId = yield select(getOrganizationId);
    yield call(saveLastUserSelection, userId, contractId, organizationId);
  } catch (e) {
    console.error(String(e));
  }
};

export const signInSessionUser = function* (): SagaIterator {
  try {
    yield put(setLoading());
    const FirseBaseAuthClient = new FireBaseAuth();
    const channel = yield call(FirseBaseAuthClient.getAuthChannel);

    while (true) {
      const result = yield take(channel);

      if (result.error) {
        yield put(authUserFailed(result.error));
      } else {
        const firebaseToken = yield call(
          FirseBaseAuthClient.fetchCurrentUserToken
        );

        const { user } = result;
        const profile = yield call(getUserProfile, user.uid);

        const response = {
          ...profile,
          name: profile.firstName + " " + profile.lastName,
          roles: profile?.roles ?? [],
          company: profile.company,
          isDashboardFrameDisabled: false,
          avatar: profile.avatar,
          title: profile.title,
          isPasswordSet: !!profile.isPasswordSet,
          facebook: profile.facebook,
          twitter: profile.twitter,
          instagram: profile.instagram,
          linkedin: profile.linkedin,
          uid: user.uid,
          email: user.email
        };

        const userDetail = {
          ...user.providerData[0],
          firebaseToken: firebaseToken,
          uid: user.uid,
          profile: response,
          organizationId: profile.organizationId || profile?.organizationIds[0],
          contractIds: profile?.contractIds
        };
        if (profile?.lastSelection?.organizationId) {
          userDetail.organizationId = profile.lastSelection.organizationId;
          yield put(setContractId(profile.lastSelection.contractId));
        } else {
          yield put(setContractId(profile?.contractIds[0]));
        }
        yield put(authUserSuccess(userDetail));
        if (userDetail.contractIds.length > 0) {
          yield put(fetchOrganizationsByContractId({}));
        }
      }
    }
  } catch (e) {
    console.error(String(e));
    yield put(authUserFailed(e.error));
  }
};

export const getExploDashboardData = function* (
  action: ISagaAction<any>
): SagaIterator {
  let exploEmbedId = "";
  let exploToken = "";
  let organizationId = yield select(getOrganizationId);
  if (!organizationId) {
    organizationId = action.payload.organizationId;
  }
  try {
    // firebase.functions().useFunctionsEmulator("http://localhost:5000");
    const fetchExploData = firebase.functions().httpsCallable("fetchExploData");
    const exploData = yield call(fetchExploData, {
      organizationId,
      isSandbox: true
    });
    exploToken = exploData.data.user_group.token;
    if (process.env.REACT_APP_FIREBASE_PROJECT_ID === "tops") {
      const templateData = exploData.data.dashboard_template_list.find(
        (x: any) => x.name.includes("tops")
      );
      if (templateData) {
        exploEmbedId = templateData.embed_id;
      } else {
        exploEmbedId = exploData.data.dashboard_template_list[0].embed_id;
      }
    } else {
      const templateData = exploData.data.dashboard_template_list.find(
        (x: any) => !x.name.includes("tops")
      );
      if (templateData) {
        exploEmbedId = templateData.embed_id;
      } else {
        exploEmbedId = exploData.data.dashboard_template_list[0].embed_id;
      }
    }
  } catch (e) {
    console.error(String(e));
  }
  const userDetail = {
    exploEmbedId,
    exploToken
  };

  yield put(setExploDashboardData(userDetail));
};

export const sendMailToResetPassword = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const FirseBaseAuthClient = new FireBaseAuth();

    const rolesResponse = yield call(
      FirseBaseAuthClient.checkExistingRoles,
      action.payload.email
    );
    if (rolesResponse.data && rolesResponse.data.data.status) {
      const mailSent = yield call(
        FirseBaseAuthClient.resetPassword,
        action.payload.email
      );
      if (mailSent)
        toast.success("Reset Link sent to your mail", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
    } else
      toast.warn("You are not an admin user", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
  } catch (e) {
    console.error(String(e));
    yield put(authPasswordResetErrors(e.message));
  }
};

export const signOutUser = function* (): SagaIterator {
  try {
    const FirseBaseAuthClient = new FireBaseAuth();
    yield call(FirseBaseAuthClient.logOutUser);
    yield put(authLogOut());
  } catch (e) {
    console.error(String(e));
  }
};

export const updatePasswordSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const FirseBaseAuthClient = new FireBaseAuth();
    const response = yield call(
      FirseBaseAuthClient.updatePassword,
      action.payload
    );
    const userId = yield select(getUserUid);
    yield call(updateChangePasswordStatus, {
      uid: userId,
      isPasswordSet: response
    });
    yield put(updatedPasswordState(response));
  } catch (e) {
    yield put(updatedPasswordError(e));
    console.error(String(e));
    toast.error(e, {
      position: toast.POSITION.BOTTOM_RIGHT,
      closeOnClick: true
    });
  }
};

export const updateProfileSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const userId = yield select(getUserUid);
    const profileUpdated = yield call(updateUserProfile, {
      ...action.payload,
      modifiedByUid: userId
    });
    yield put(setModalLoading(false));
    if (profileUpdated) {
      yield put(updateProfileChangeSucess(profileUpdated));
      // toast.success("Profile Updated Successfully", {
      //   position: toast.POSITION.TOP_CENTER,
      //   closeOnClick: true
      // });
      yield put(setProfileModalState(false));
    }
  } catch (e) {
    yield put(setModalLoading(false));
    console.error(String(e));
    toast.error(e, {
      position: toast.POSITION.BOTTOM_RIGHT,
      closeOnClick: true
    });
  }
};

export const getCustomTokenSaga = function* (): SagaIterator {
  while (yield take(authUserSuccess)) {
    try {
      const fetchCustomToken = firebase
        .functions()
        .httpsCallable("adminCreateCustomToken");
      const res = yield call(fetchCustomToken);

      if (res.data) {
        yield put(setCustomToken(res.data));
      }
    } catch (e) {
      console.error(String(e));
    }
  }
};

export default signInUser;
