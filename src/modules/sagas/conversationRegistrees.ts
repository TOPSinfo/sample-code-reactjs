import { SagaIterator, eventChannel } from "redux-saga";
import {
  removeCurrentConversationId,
  setConversationIdEditDatabase,
  setConversationRegistrees,
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

export const fetchConversationRegistreeListemer = function* (): SagaIterator {
  while (yield take(setConversationIdEditDatabase)) {
    const connectionTask = yield fork(fetchConversationRegistree);
    yield take([removeCurrentConversationId, resetOrganizationData]);

    yield cancel(connectionTask);
  }
};

const fetchConversationRegistree = function* (): SagaIterator {
  try {
    const conversationId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      organizationId,
      conversationId
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
          yield put(setConversationRegistrees(mpResult || []));
        } else {
          yield put(setConversationRegistrees([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
        yield put(setConversationRegistrees([]));
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};

const getRegistees = (props: any) => {
  const conversationComponentRef = EventRegistree.reference(
    props.organizationId,
    props.conversationId
  );
  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = conversationComponentRef.onSnapshot(
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

export const addImportedCsvConversationFileDataSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentConversationId);
    console.log("eventId", eventId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      csvData: action.payload,
      eventId,
      organizationId
    };
    const response = yield call(registreeApi.csvImportDataApi, obj);
    if (response.data && response.data.data.status) {
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

export const clearChatConversationSaga = function* (): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      eventId,
      organizationId
    };
    const response = yield call(registreeApi.clearChatApi, obj);
    console.log("clearChatSaga", response);
  } catch (e) {
    console.error(String(e))
    toast.error("Failed csv import", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const editConversationRegistree = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const conversationId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const updateData = action.payload.email;
    const selectedRow = action.payload.selectedRow;
    if (updateData) {
      yield call(updateConversationRegistree, {
        conversationId,
        organizationId,
        updateData: { email: updateData },
        selectedRow
      });
    }
  } catch (e) {
    console.error(String(e))
  }
};

const updateConversationRegistree = async (props: any) => {
  const conversationComponentRef = EventRegistree.reference(
    props.organizationId,
    props.conversationId
  );
  return await conversationComponentRef
    .doc(props.selectedRow.obj_id)
    .update(props.updateData);
};

export const removeConversationRegistree = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const conversationId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const selectedRow = action.payload.selectedRow;
    yield call(deleteConversationRegistree, {
      conversationId,
      organizationId,
      selectedRow
    });
  } catch (e) {
    console.error(String(e))
  }
};

const deleteConversationRegistree = async (props: any) => {
  const conversationComponentRef = EventRegistree.reference(
    props.organizationId,
    props.conversationId
  );
  return await conversationComponentRef.doc(props.selectedRow.obj_id).delete();
};
