import {
  debounce,
  put,
  select,
  call,
  all,
  take,
  fork,
  cancel,
  cancelled
} from "redux-saga/effects";
import { SagaIterator, eventChannel } from "redux-saga";
import {
  savingConversationData,
  setOnchangeLoader,
  resetOrganizationData,
  setFetchedConversationList,
  authUserSuccess,
  signOutUser,
  setFetchingConversationFlag,
  setModalLoading
} from "modules/actions";
import { ISagaAction } from "modules/types";
import * as selectors from "../selectors";
import * as conversationAPi from "modules/utils/Firebase/CreateEvent/Event";
import { toast } from "react-toastify";
import { Event } from "modules/utils/Firebase/Api";
import { v4 as uuidv4 } from "uuid";
import EventStatus from "../utils/event.status";
import { fieldValue } from "../utils/Firebase";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import firebase from "modules/utils/Firebase";

export const fetchConversationListListener = function* (): SagaIterator {
  while (yield take(authUserSuccess)) {
    const connectionTask = yield fork(fetchConversationListsSaga);
    yield take([signOutUser, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

export const throttleSaveConversation = function* (): SagaIterator {
  try {
    yield debounce(3000, savingConversationData, SaveConversationData);
  } catch (e) {
    console.error(String(e))
  }
};

export const SaveConversationData = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(
      setOnchangeLoader({ isChangeLoader: true, isSavedloader: false })
    );
    const payload = action.payload;
    const organizationId = yield select(selectors.getOrganizationId);
    const conversationList: any = yield select(selectors.getConversationsList);
    const ifExist = conversationList.findIndex(
      (value: any) => value.id === payload.id
    );
    if (ifExist >= 0) {
      yield call(conversationAPi.updateNewEventApi, {
        ...payload,
        organizationId
      });
    } else {
      yield call(conversationAPi.saveNewEventApi, {
        ...payload,
        organizationId
      });
    }

    yield all([
      put(setOnchangeLoader({ isChangeLoader: false, isSavedloader: true }))
    ]);
  } catch (e) {
    console.error(String(e))
  }
};

export const fetchConversionListSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    let conversationsList = yield call(
      conversationAPi.eventList,
      organizationId
    );
    if (conversationsList && conversationsList.length) {
      conversationsList = conversationsList.map((value: any) => {
        value.isChecked = false;
        return value;
      });
    }
    yield put(setFetchedConversationList(conversationsList));
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchConversationListsSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const channel = yield call(getConversationList, organizationId);
    try {
      while (true) {
        let result = yield take(channel);
        if (result && typeof result === "object") {
          result = result.filter((val: any) => {
            return val.type === "conversation";
          });
          yield put(setFetchedConversationList(result));
        } else {
          yield put(setFetchedConversationList([]));
        }
      }
    } catch (e) {
      console.error(String(e))
    } finally {
      if (yield cancelled()) {
        channel.close();
        yield put(setFetchedConversationList([]));
      }
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

const getConversationList = (organizationId: string) => {
  const conversationRef = Event.reference(organizationId);

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = conversationRef.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (querySnapshot.docs) {
          return emit(querySnapshot.docs.map((x: any) => x.data()));
        } else return emit(false);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return connectionRoomListner;
};

export const deleteConversationSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setFetchingConversationFlag(true));
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      id: action.payload.id,
      organizationId: organizationId
    };
    const response = yield call(conversationAPi.deleteEventsApi, obj);
    if (response) {
      toast.success("Conversation deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e))
    yield put(setFetchingConversationFlag(false));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const copyConversationSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const UUID = uuidv4();
    const obj = {
      ...action.payload,
      id: UUID,
      status: EventStatus.DRAFT,
      updatedAt: fieldValue.serverTimestamp(),
      createdAt: fieldValue.serverTimestamp(),
      name: ("Copy of " + action.payload.title).substring(0, 35)
    };
    set(obj, "access.link.preview", false);
    const response = yield call(
      conversationAPi.copyEventApi,
      obj,
      action.payload.id
    );
    if (response) {
      const conversationList = yield select(selectors.getConversationsList);
      const newConversationList = cloneDeep(conversationList);
      newConversationList.push({
        ...obj,
        updatedAt: new firebase.firestore.Timestamp(
          firebase.firestore.Timestamp.now().seconds,
          firebase.firestore.Timestamp.now().nanoseconds
        )
      });
      yield all([put(setModalLoading(false))]);
      toast.success("Conversation copied successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};
