import { SagaIterator } from "redux-saga";
import { all, call, put, select } from "redux-saga/effects";
import {
  setAdminUserModalState,
  setFecthedUserList,
  setModalLoading,
  updateTeamUser,
  removeTeamUser,
  addNewUserToTeam,
  closeDeleteModal,
  setSelectedTeamUser,
  fetchUserList
} from "modules/actions";
import { ISagaAction } from "modules/types";
import * as userApi from "modules/utils/Firebase/UserManagement/User";
import { toast } from "react-toastify";
import * as selectors from "modules/selectors";
import firebase from "firebase/app";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

export const fetchUserManagementListSaga = function* (): SagaIterator {
  try {
    yield put(fetchUserList());
    const contractId = yield select(selectors.getContractId);
    const userList = yield call(userApi.listUser, {
      contractId
    });

    if (Array.isArray(userList)) yield put(setFecthedUserList(userList));
  } catch (e) {
    console.error(String(e));
  }
};

// new saga fn for admin
export const addAdminUserSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const contractId = yield select(selectors.getContractId);
    const addAdmin = firebase.functions().httpsCallable("adminRegister");
    const response = yield call(addAdmin, {
      email: action.payload.email,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      organizationId: action.payload.organizationId
        ? action.payload.organizationId
        : "",
      roles: action.payload.roles,
      contractId
    });

    yield put(setModalLoading(false));
    if (response && response.data && response.data.data) {
      yield all([
        put(addNewUserToTeam(response.data.data)),
        put(setAdminUserModalState(false))
      ]);
      toast.success("Changes successfully saved", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    } else if (response && response.data && response.data.error) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield put(setModalLoading(false));
      return;
    } else if (response.error) {
      toast[response.error ? "error" : "success"](
        response.error.message || response.message,
        {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true
        }
      );
      yield put(setModalLoading(false));
      return;
    }
  } catch (e) {
    yield put(setModalLoading(false));
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      closeOnClick: true
    });
  }
};

export const editAdminUserSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const payload = { ...action.payload };
    const userProfile = yield select(selectors.getUserProfile);
    const contractId = yield select(selectors.getContractId);
    if (userProfile && userProfile.uid) {
      payload.modifiedByUid = userProfile.uid;
    }

    payload.contractId = contractId || "";
    const response = yield call(
      userApi.editAdminUser,
      omitBy(action.payload, isNil)
    );
    if (response) {
      yield put(updateTeamUser(action.payload));
      /* toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      }); */
      toast.success("Changes successfully saved", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield put(
        setSelectedTeamUser({
          ...action.payload,
          user: {
            firstName: action.payload?.firstName,
            lastName: action.payload?.lastName,
            email: action.payload?.email,
            roles: action.payload.roles
          }
        })
      );
    }
    yield all([
      put(setAdminUserModalState(false)),
      put(setModalLoading(false))
    ]);
    if (!response) {
      yield put(setAdminUserModalState(false));
      toast.error("Updation Failed", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    yield put(setModalLoading(false));
    toast.error("Updation Failed", {
      position: toast.POSITION.TOP_CENTER,
      closeOnClick: true
    });
    console.error(String(e));
  }
};

export const deleteAdminTeamUser = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const removeAdmin = firebase.functions().httpsCallable("removeAdmin");
    const response = yield call(removeAdmin, {
      uid: action.payload
    });
    yield put(setModalLoading(false));
    if (response && response.data && response.data.message) {
      yield all([
        put(removeTeamUser(action.payload)),
        put(setSelectedTeamUser(null))
      ]);
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    } else if (response.error) {
      toast.error("Deletion Failed", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
    yield put(closeDeleteModal());
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      closeOnClick: true
    });
    yield all([put(setModalLoading(false)), put(closeDeleteModal())]);
  }
};
