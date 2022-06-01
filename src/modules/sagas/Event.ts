import {
  all,
  call,
  put,
  select,
  debounce,
  fork,
  cancel,
  take,
  cancelled
} from "redux-saga/effects";
import { SagaIterator, eventChannel } from "redux-saga";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import {
  setFecthedEventsList,
  setModalLoading,
  setPublishModalState,
  redirectToEventList,
  setFetchingFlag,
  handleRenameModal,
  renamePropertyUpdated,
  savingEventData,
  addSponsorTypes,
  saveSponsorTypes,
  setAllUsersFromEmails,
  setOnchangeLoader,
  authUserSuccess,
  signOutUser,
  resetOrganizationData,
  setAllGroupsList,
  fetchGroupLists,
  savingConversationData
} from "modules/actions";
import { ISagaAction } from "modules/types";
import * as eventAPi from "modules/utils/Firebase/CreateEvent/Event";
import * as selectors from "../selectors";
import EventStatus from "../utils/event.status";
import { fieldValue } from "../utils/Firebase";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import firebase from "modules/utils/Firebase";
import { sponsorTypes } from "modules/utils/commonFn";
import { Event } from "modules/utils/Firebase/Api";
export const fetchEventListListener = function* (): SagaIterator {
  while (yield take(authUserSuccess)) {
    const connectionTask = yield fork(fetchEventListsSaga);
    // wait for the user stop action
    yield take([signOutUser, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

export const fetchEventListSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    let eventsList = yield call(eventAPi.eventList, organizationId);
    eventsList = eventsList.map((value: any) => {
      value.isChecked = false;
      return value;
    });
    yield put(setFecthedEventsList(eventsList));
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const createEventSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const UUID = uuidv4();
    const obj = {
      ...action.payload,
      UUID
    };
    const response = yield call(eventAPi.createNewEventApi, obj);
    if (response) {
      toast.success("Event added successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield all([
        put(setModalLoading(false)),
        put(setPublishModalState(false)),
        put(redirectToEventList(true))
      ]);
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const throttleSaveEvent = function* (): SagaIterator {
  try {
    yield debounce(3000, savingEventData, SaveEventData);
  } catch (e) {
    console.error(String(e))
  }
};

export const SaveEventData = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(
      setOnchangeLoader({ isChangeLoader: true, isSavedloader: false })
    );
    const payload = action.payload;
    const organizationId = yield select(selectors.getOrganizationId);
    const eventList: any = yield select(selectors.getEventsList);
    const ifExist = eventList.findIndex(
      (value: any) => value.id === payload.id
    );
    const obj = {
      organizationId,
      eventId: payload.id
    };
    if (ifExist >= 0) {
      yield call(eventAPi.updateNewEventApi, {
        ...payload,
        organizationId
      });
    } else {
      yield call(eventAPi.addSponsorTypesDb, obj);
      yield call(eventAPi.saveNewEventApi, {
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

export const deleteEventSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setFetchingFlag(true));
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      id: action.payload.id,
      organizationId: organizationId
    };
    const response = yield call(eventAPi.deleteEventsApi, obj);
    if (response) {
      toast.success("Event deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e))
    yield put(setFetchingFlag(false));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const restoreEventSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    yield put(setFetchingFlag(true));
    const obj = {
      id: action.payload.id,
      organizationId: organizationId
    };
    const response = yield call(eventAPi.restoreEventsApi, obj);
    if (response) {
      toast.success("Event restored successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
    }
  } catch (e) {
    console.error(String(e))
    yield put(setFetchingFlag(false));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const copyEventSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);

    yield put(setModalLoading(true));
    const UUID = uuidv4();
    const obj = {
      ...action.payload,
      id: UUID,
      status: EventStatus.DRAFT,
      updatedAt: fieldValue.serverTimestamp(),
      createdAt: fieldValue.serverTimestamp(),
      name: ("Copy of " + action.payload.name).substring(0, 35)
    };
    const sponsorTypeObj = {
      organizationId,
      eventId: obj.id,
      sponsorTypes
    };
    set(obj, "access.link.preview", false);
    const response = yield call(eventAPi.copyEventApi, obj, action.payload.id);
    if (response) {
      const eventList = yield select(selectors.getEventsList);
      const newEventList = cloneDeep(eventList);
      newEventList.push({
        ...obj,
        updatedAt: new firebase.firestore.Timestamp(
          firebase.firestore.Timestamp.now().seconds,
          firebase.firestore.Timestamp.now().nanoseconds
        )
      });
      yield call(eventAPi.addSponsorTypesDb, sponsorTypeObj);
      yield all([put(setModalLoading(false))]);
      toast.success("Event copied successfully", {
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

export const renameEventSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    const response = yield call(eventAPi.renameEventNameApi, action.payload);
    if (response) {
      toast.success("Event name updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield all([
        put(setModalLoading(false)),
        put(handleRenameModal(false)),
        put(renamePropertyUpdated(action.payload))
      ]);
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchEventSponsorTypes = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const response = yield call(eventAPi.fetchEventSponsorTypes, {
      ...action.payload,
      organizationId
    });
    console.log("response", response);
    yield put(addSponsorTypes(response));
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const throttleSaveEventSponsorsType = function* (): SagaIterator {
  try {
    yield debounce(3000, saveSponsorTypes, SaveEventSponsorsType);
  } catch (e) {
    console.error(String(e))
  }
};

const SaveEventSponsorsType = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const response = yield call(eventAPi.saveNewSponsorTypeApi, {
      ...action.payload,
      organizationId
    });
    console.log(response);
  } catch (e) {
    console.error(String(e))
  }
};
export const fetchUserSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const response = yield call(eventAPi.fetchUserFromEmails, organizationId);
    yield put(setAllUsersFromEmails(response || []));
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchEventListsSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const channel = yield call(getEventList, organizationId);
    try {
      while (true) {
        let result = yield take(channel);
        if (result && typeof result === "object") {
          result = result.filter((val: any) => {
            return val.type !== "conversation";
          });
          yield put(setFecthedEventsList(result));
        } else {
          yield put(setFecthedEventsList([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
        yield put(setFecthedEventsList([]));
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

const getEventList = (organizationId: string) => {
  const eventRef = Event.reference(organizationId);

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = eventRef.onSnapshot(
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

export const fetchGroupSaga = function* (): SagaIterator {
  try {
    const currentEventId = yield select(selectors.getCurrentEventId);
    const currentConversationId = yield select(
      selectors.getCurrentConversationId
    );
    const eventId = currentEventId || currentConversationId;
    const organizationId = yield select(selectors.getOrganizationId);
    const payload = {
      eventId,
      organizationId
    };
    const response = yield call(eventAPi.fetchGroupList, payload);
    yield put(setAllGroupsList(response || []));
  } catch (e) {
    console.error(String(e))
  }
};

export const saveGroupSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const payload = action.payload;

    const organizationId = yield select(selectors.getOrganizationId);
    const currentEventId = yield select(selectors.getCurrentEventId);
    const eventData = yield select(selectors.getEventState);
    const conversationData = yield select(selectors.getConversationState);
    const currentConversationId = yield select(
      selectors.getCurrentConversationId
    );
    const eventId = currentEventId || currentConversationId;

    const obj = {
      ...payload,
      organizationId,
      eventId
    };

    let response
    if (payload?.id) {
      response = yield call(eventAPi.EditGroupData, obj);
    }
    else {
      response = yield call(eventAPi.saveGroupData, obj);
    }
    if (response.isCheckedPolls) {
      if (currentEventId) {
        yield put(savingEventData({ ...eventData, pollExclusiveId: response.id }))
      }
      else {
        yield put(savingConversationData({ ...conversationData, pollExclusiveId: response.id }));
      }
    } else if (!response.isCheckedPolls && payload.prevCheckedValue) {
      if (currentEventId) {
        yield put(savingEventData({ ...eventData, pollExclusiveId: "" }))
      }
      else {
        yield put(savingConversationData({ ...conversationData, pollExclusiveId: "" }));
      }
    }

    if (response) {
      toast.success("Group updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true
      });
      yield put(fetchGroupLists());
    }
  } catch (e) {
    console.error(String(e))
  }
};
