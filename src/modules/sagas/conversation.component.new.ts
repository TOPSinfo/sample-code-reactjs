import { SagaIterator, eventChannel } from "redux-saga";
import {
  setConversationComponentsNew,
  setCurrentConversationId,
  removeCurrentConversationId,
  resetOrganizationData,
  setModalLoading,
  setConversationComponentsRowSelectedNew,
  closeDeleteModal,
  createEditConversationComponentModal,
  createdConversationSuccess,
  // createConversationSpeakerActions,
  setFecthedPeopleUserList,
  removeTeamPeople
} from "../actions";
import { breakoutSegment, loungeSegment, lobbySegment } from "../utils/eventComponent.types";
import { toast } from "react-toastify";
import { ISagaAction } from "../types";
import {
  call,
  all,
  put,
  select,
  take,
  cancelled,
  fork,
  cancel
} from "redux-saga/effects";
import { MEETING_TYPES } from "../../@theme/commonfile";
import * as selectors from "modules/selectors";
import { ConversationComponent, Event } from "modules/utils/Firebase/Api";
import { compactObject } from "modules/utils/commonFn";
import * as conversationComponentNewAPi from "../../modules/utils/Firebase/CreateConversation/conversationComponentNew";

export const saveConversationComponentSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const orgId = yield select(selectors.getOrganizationId);
    const currentUser = yield select(selectors.getUserProfile);
    yield put(setModalLoading(true));
    let requestPayload = null;
    let payload = action.payload;
    if (!("id" in action.payload)) {
      const ref = ConversationComponent.reference(
        orgId,
        action.payload.conversationId
      ).doc();
      payload = { ...payload, id: ref.id };
    }
    if ([MEETING_TYPES.BROADCAST_ROOM, MEETING_TYPES.MEETING_ROOM].includes(payload.componentType)) {
      requestPayload = breakoutSegment(payload);
    }
    if ([MEETING_TYPES.AGENDA].includes(payload.componentType)) {
      requestPayload = payload
    }
    if ([MEETING_TYPES.LOBBY].includes(payload.componentType)) {
      requestPayload = compactObject(lobbySegment(payload));
    }
    if ([MEETING_TYPES.NETWORKING_AREA].includes(payload.componentType)) {
      requestPayload = compactObject(loungeSegment(payload));
      yield call(conversationComponentNewAPi.setLoungeData, {
        ...requestPayload,
        organizationId: orgId,
        conversationId: payload.conversationId
      });
    }
    if (currentUser && currentUser.uid) {
      requestPayload.updatedBy = currentUser.uid;
    }
    const response = yield call(
      conversationComponentNewAPi.saveConversationComponentApi,
      {
        ...requestPayload,
        organizationId: orgId,
        conversationId: payload.conversationId
      }
    );
    if (response) {
      yield all([
        put(setModalLoading(false)),
        put(createEditConversationComponentModal(false)),
        put(setConversationComponentsRowSelectedNew(response))
      ]);
    }
  } catch (e) {
    yield put(setModalLoading(false));
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchConversationComponentListemer = function* (): SagaIterator {
  while (yield take(setCurrentConversationId)) {
    const connectionTask = yield fork(FetchAllConversationComponents);

    yield take([removeCurrentConversationId, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

export const FetchAllConversationComponents = function* (): SagaIterator {
  try {
    const conversationId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      organizationId,
      conversationId
    };
    const channel = yield call(getComponents, obj);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && typeof result === "object") {
          yield put(setConversationComponentsNew(result || []));
        } else {
          yield put(setConversationComponentsNew([]));
        }
      }
    } catch (e) {
      console.error(String(e))
    } finally {
      if (yield cancelled()) {
        channel.close();
        yield put(setConversationComponentsNew([]));
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};

const getComponents = (props: any) => {
  const conversationComponentRef = ConversationComponent.reference(
    props.organizationId,
    props.conversationId
  );

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = conversationComponentRef.onSnapshot(
      (querySnapshot: any) => {
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

export const createConversationAtInitial = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const response = yield call(
      conversationComponentNewAPi.createConversation,
      action.payload
    );
    if (response) {
      yield all([put(createdConversationSuccess(false))]);
    }
  } catch (e) {
    console.error(String(e))
  }
};

export const savingConversationSpeakerData = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);
    const payload = {
      ...action.payload,
      eventId,
      organizationId
    };
    const response = yield call(
      conversationComponentNewAPi.saveSpeakerData,
      payload
    );
    if (response) {
      yield all([
        // put(createConversationSpeakerActions(response)),
        put(setModalLoading(false))
      ]);
      toast.success(
        payload.id
          ? "Speakers updated successfully"
          : "Speakers added successfully",
        {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true
        }
      );
    }
  } catch (e) {
    put(setModalLoading(false));
    console.error(String(e))
  }
};

export const fetchConversationSpeakerListemer = function* (): SagaIterator {
  while (yield take(setCurrentConversationId)) {
    const connectionTask = yield fork(FetchConversationSpeakers);

    yield take([removeCurrentConversationId, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

export const FetchConversationSpeakers = function* (): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentConversationId);
    const organizationId = yield select(selectors.getOrganizationId);

    const obj = {
      organizationId,
      eventId
    };
    const channel = yield call(getSpeakers, obj);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && result.length) {
          const response = yield call(
            conversationComponentNewAPi.getPeopleData,
            result
          );
          yield put(setFecthedPeopleUserList(response));
        }
      }
    } catch (e) {
      console.error(String(e))
    } finally {
      if (yield cancelled()) {
        channel.close();
        yield put(setFecthedPeopleUserList([]));
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

const getSpeakers = (props: any) => {
  const conversationComponentRef = Event.docReference(
    props.organizationId,
    props.eventId
  ).collection("speakers");

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = conversationComponentRef.onSnapshot(
      (querySnapshot: any) => {
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

export const deleteSpeakerPeopleSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    yield put(setModalLoading(true));
    yield call(conversationComponentNewAPi.deleteSpeakerPeople, {
      ...action.payload
    });
    yield put(removeTeamPeople(action.payload));
    yield put(setModalLoading(false));
    toast.success("Deleted Successfully", {
      position: toast.POSITION.TOP_CENTER,
      closeOnClick: true
    });
    yield put(closeDeleteModal());
  } catch (e) {
    console.error(String(e))
  }
};
