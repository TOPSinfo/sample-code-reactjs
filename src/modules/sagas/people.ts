import { SagaIterator } from "redux-saga";
import {
  all,
  call,
  put,
  select,
  take,
  fork,
  cancel,
  cancelled
} from "redux-saga/effects";
import {
  setPeopleModalState,
  setFetchedPeopleList,
  setFetchedProfile,
  setModalLoading,
  removeTeamPeople,
  addNewPeopleToTeam,
  updatePeopleToTeam,
  setSelectedPeople,
  closeDeleteModal,
  setDoubleClickSelectedPeople,
  authUserSuccess,
  signOutUser,
  resetOrganizationData
} from "modules/actions";
import { ISagaAction } from "modules/types";
import * as peopleApi from "modules/utils/Firebase/EventResources/People";
import { toast } from "react-toastify";
import * as selectors from "modules/selectors";

export const fetchPeoplerListener = function* (): SagaIterator {
  while (yield take(authUserSuccess)) {
    const connectionTask = yield fork(fetchPeopleListenerSaga);
    // wait for the user stop action
    yield take([signOutUser, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

export const fetchPeopleListSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const peopleList = yield call(peopleApi.listPeople, {
      organizationId: organizationId
    });
    if (Array.isArray(peopleList)) yield put(setFetchedPeopleList(peopleList));
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

// fetch Profiles with same email id
export const fetchProfileByEmailSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const response = yield call(peopleApi.profileByEmail, action.payload);
    if (response.data) {
      yield put(setFetchedProfile(response.data));
    }
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

// new saga fn for admin
export const addPeopleSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const userUid = yield select(selectors.getUserUid);
    const firebaseToken = yield select(selectors.getFirebaseAccessToken);
    const response = yield call(peopleApi.addPeople, {
      ...action.payload,
      modifiedByUid: userUid,
      token: firebaseToken
    });
    yield put(setModalLoading(false));
    if (response.error) {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield put(setModalLoading(false));
      return;
    }
    if (response.data) {
      yield put(addNewPeopleToTeam(response.data));
      yield put(setPeopleModalState(false));
      toast.success("Person successfully added", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const editPeopleSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const userUid = yield select(selectors.getUserUid);
    const firebaseToken = yield select(selectors.getFirebaseAccessToken);
    let selectedPeople: any = yield select(selectors.getSelectedPeople);

    const response = yield call(peopleApi.editPeople, {
      ...action.payload,
      modifiedByUid: userUid,
      token: firebaseToken
    });
    if (response.data) {
      selectedPeople = { ...response.data };
      yield put(updatePeopleToTeam(response.data));
      toast.success("Person successfully updated", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
    if (response.error) {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield put(setModalLoading(false));
      return;
    }
    yield all([
      put(setPeopleModalState(false)),
      put(setModalLoading(false)),
      put(setDoubleClickSelectedPeople({ data: selectedPeople, status: false }))
    ]);
    if (!response) {
      toast.error("Updation Failed", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const deletePeopleSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const response = yield call(peopleApi.deletePeople, {
      ...action.payload
    });
    yield put(setModalLoading(false));
    if (response.result) {
      yield put(removeTeamPeople(action.payload));
      yield put(setSelectedPeople(null));
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
  }
};

export const fetchPeopleListenerSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const channel = yield call(peopleApi.getPeopleList, organizationId);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && typeof result === "object") {
          yield put(setFetchedPeopleList(result));
        } else {
          yield put(setFetchedPeopleList([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
        yield put(setFetchedPeopleList([]));
      }
    }
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};
