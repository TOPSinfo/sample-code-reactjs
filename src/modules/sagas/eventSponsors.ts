import { SagaIterator } from "redux-saga";
import { call, select } from "redux-saga/effects";

import * as sponsorsApi from "../utils/Firebase/CreateEvent";
import { ISagaAction } from "modules/types";
import * as selectors from "modules/selectors";
export const deleteSponsor = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    yield call(sponsorsApi.removeSponsorApi, {
      ...action.payload,
      organizationId
    });
  } catch (e) {
    console.error(String(e));
  }
};
