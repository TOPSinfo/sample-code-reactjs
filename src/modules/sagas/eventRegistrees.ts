import { eventChannel, SagaIterator } from "redux-saga";
import {
  removeCurrentEventId,
  setEventIdEditDatabase,
  setEventRegistrees,
  resetOrganizationData,
  fetchGroupLists
} from "../actions";

import {
  select,
  call,
  take,
  fork,
  cancel,
  put,
  cancelled
} from "redux-saga/effects";
import * as selectors from "../selectors";
import { EventRegistree } from "../utils/Firebase/Api";
import { ISagaAction } from "../types";
import * as registreeApi from "modules/utils/Firebase/CreateEvent/Registree";
import { toast } from "react-toastify";
import firebase from "modules/utils/Firebase";

export const fetchEventRegistreeListemer = function* (): SagaIterator {
  while (yield take(setEventIdEditDatabase)) {
    const connectionTask = yield fork(fetchEventRegistree);
    yield take([removeCurrentEventId, resetOrganizationData]);

    yield cancel(connectionTask);
  }
};

export const editEventRegistree = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const currentConversationId = yield select(
      selectors.getCurrentConversationId
    );
    const currentEventId = yield select(selectors.getCurrentEventId);
    const eventId = currentEventId || currentConversationId;
    const organizationId = yield select(selectors.getOrganizationId);
    const updateData = action.payload.email;
    const selectedRow = action.payload.selectedRow;
    if (updateData) {
      yield call(updateEventRegistree, {
        eventId,
        organizationId,
        updateData: { email: updateData },
        selectedRow
      });
    }
  } catch (e) {
    console.error(String(e))
  }
};

export const removeEventRegistree = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const currentConversationId = yield select(
      selectors.getCurrentConversationId
    );
    const currentEventId = yield select(selectors.getCurrentEventId);
    const eventId = currentEventId || currentConversationId;
    const organizationId = yield select(selectors.getOrganizationId);
    const selectedRow = action.payload.selectedRow;
    yield call(deleteEventRegistree, {
      eventId,
      organizationId,
      selectedRow
    });
  } catch (e) {
    console.error(String(e))
  }
};

const fetchEventRegistree = function* (): SagaIterator {
  try {
    const currentConversationId = yield select(
      selectors.getCurrentConversationId
    );
    const currentEventId = yield select(selectors.getCurrentEventId);
    const eventId = currentEventId || currentConversationId;
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      organizationId,
      eventId
    };

    const channel = yield call(getRegistees, obj);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && typeof result === "object") {
          const mpResult = result.map((x: any) => ({
            ...x,
            name: `${x.givenName || x.firstName} ${x.familyName || x.lastName}`
          }));
          yield put(setEventRegistrees(mpResult || []));
        } else {
          yield put(setEventRegistrees([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
        yield put(setEventRegistrees([]));
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};
const getRegistees = (props: any) => {
  const eventComponentRef = EventRegistree.reference(
    props.organizationId,
    props.eventId
  );

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = eventComponentRef.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (querySnapshot.docs) {
          return emit(
            querySnapshot.docs.map((x: any) => ({ ...x.data(), obj_id: x.id }))
          );
        } else return emit(false);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return connectionRoomListner;
};
const updateEventRegistree = async (props: any) => {
  const eventComponentRef = EventRegistree.reference(
    props.organizationId,
    props.eventId
  );
  return await eventComponentRef
    .doc(props.selectedRow.obj_id)
    .update(props.updateData);
};

const deleteEventRegistree = async (props: any) => {
  const eventComponentRef = EventRegistree.reference(
    props.organizationId,
    props.eventId
  );
  return await eventComponentRef.doc(props.selectedRow.obj_id).delete();
};

export const addImportedCsvFileDataSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentEventId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      csvData: action.payload,
      eventId,
      organizationId
    };
    const response = yield call(registreeApi.csvImportDataApi, obj);
    if (response.data && response.data.data.status) {
      // yield put(setEventIdEditDatabase());
      // yield put(toggleEditDatabaseModal(true));
      yield put(fetchGroupLists());
      toast.success("Import operation successfull", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
    }
  } catch (e) {
    console.error(String(e))
    toast.error("Failed csv import", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const clearChatSaga = function* (): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentEventId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      eventId,
      organizationId
    };
    const response = yield call(registreeApi.clearChatApi, obj);
    console.log("clearChatSaga", response);
  } catch (e) {
    console.error(String(e));
    toast.error("Failed csv import", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};
