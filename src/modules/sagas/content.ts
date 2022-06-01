import { SagaIterator } from "redux-saga";
import {
  call,
  select,
  put,
  take,
  cancel,
  fork,
  cancelled
} from "redux-saga/effects";
import { ISagaAction } from "modules/types";
import { toast } from "react-toastify";
import * as contentApi from "modules/utils/Firebase/ContentFile/content";
import * as selectors from "modules/selectors";
import {
  setContentFile,
  removeContent,
  setSelectedContent,
  updateContentList,
  setRecordingData,
  fetchRecordingData,
  resetOrganizationData,
  removeRecordingListner
} from "modules/actions";
export const addContentFileSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);

    const obj = {
      ...action.payload,
      organizationId
    };
    const respo = yield call(contentApi.addFileToDb, obj);
    if (respo) {
      yield put(updateContentList(action.payload));
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchContentDatasaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const response = yield call(contentApi.fetchContentFile, organizationId);
    if (response) yield put(setContentFile(response));
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const deleteContentSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      id: action.payload.id,
      type: action.payload.type,
      organizationId
    };
    const response = yield call(contentApi.deleteContentApi, obj);
    if (response) {
      yield put(setSelectedContent(null));

      yield put(removeContent(action.payload.id));
    }
  } catch (e) {
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const fetchRecordingListner = function* (): SagaIterator {
  while (yield take(fetchRecordingData)) {
    const connectionTask = yield fork(fetchRecordingSaga);

    yield take([removeRecordingListner, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};

const fetchRecordingSaga = function* (): SagaIterator {
  const organizationId = yield select(selectors.getOrganizationId);
  const channel = yield call(contentApi.fetchRecordingApi, organizationId);
  try {
    while (true) {
      const result = yield take(channel);
      if (result) {
        const records = result.map((data: any) => {
          const obj = {
            type: "Recording",
            title: data.title,
            id: data.id,
            roomId: data.roomId,
            meetingId: data.MeetingId,
            updatedAt: data.createdAt
          };
          return obj;
        });

        yield put(setRecordingData(records));
      } else {
        yield put(setRecordingData([]));
      }
    }
  } catch (e) {
    console.warn(e);
  } finally {
    // unregister listener if the saga was cancelled
    if (yield cancelled()) {
      channel.close();
      yield put(setRecordingData([]));
    }
  }
};
