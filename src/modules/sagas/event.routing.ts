import { SagaIterator } from "redux-saga";
import {
  setEventFriendlyName,
  setEventFriendlyNameError,
  setEventFriendlyNameLocally,
  setEventFriendlyNameSuccess
} from "../actions";
import { ISagaAction } from "../types";
import * as eventRoutingApi from "../utils/Firebase/CreateEvent/eventRouting";
import { call, put, select, debounce } from "redux-saga/effects";
import * as selectors from "../selectors";
import slugid from "slugid";

export const throttleSaveEventFriendlyComponents = function* (): SagaIterator {
  try {
    yield debounce(3000, setEventFriendlyName, saveEventFriendlyName);
  } catch (e) {
    console.error(String(e))
  }
};

export const saveEventFriendlyName = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const eventId = action.payload.eventId;
    const startTime = action.payload.startTime.split("/").join("-");
    const friendlyUrl = action.payload.friendlyUrl
      .toLowerCase()
      .split(" ")
      .join("-");

    if (friendlyUrl) {
      const isExist = yield call(
        eventRoutingApi.checkEventNameExist,
        eventId,
        friendlyUrl
      );
      const orgId = yield select(selectors.getOrganizationId);
      const eventUrl = `https://tops.com/${orgId}/${slugid.encode(eventId)}`;
      if (isExist)
        yield put(setEventFriendlyNameError("This path is already taken"));
      else {
        yield call(
          eventRoutingApi.saveEventFriendlyName,
          eventId,
          orgId,
          friendlyUrl,
          eventUrl,
          startTime
        );
        yield put(
          setEventFriendlyNameSuccess(
            "This path is available and has been saved"
          )
        );
      }
    } else {
      if (action.payload.checkAvailibility)
        yield put(setEventFriendlyNameError("Please enter valid path."));
    }
  } catch (e) {
    console.error(String(e))
  }
};

export const getEventFriendlyName = function* (
  action: ISagaAction<any>
): SagaIterator {
  const eventId = action.payload.eventId;
  const friendlyNameRoutingObj = yield call(
    eventRoutingApi.getEventFriendlyName,
    eventId
  );
  yield put(
    setEventFriendlyNameLocally(friendlyNameRoutingObj || { friendlyUrl: "" })
  );
};
