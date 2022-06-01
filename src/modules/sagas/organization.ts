import { SagaIterator } from "redux-saga";
import { call, put, debounce, select } from "redux-saga/effects";
import {
  fetchOrganizationSuccess,
  setSocial,
  setLanding
} from "modules/actions";
import { ISagaAction } from "modules/types";
import {
  fecthOrganization,
  saveSocialData,
  saveLandingData
} from "modules/utils/Firebase/Organization";
import * as selectors from "../selectors";

export const fetchOrganizationSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const organizationId = action.payload.organizationId;
    const organization = yield call(fecthOrganization, organizationId);
    console.log("organization", organization);
    yield put(fetchOrganizationSuccess(organization));
  } catch (e) {
    console.error(String(e));
  }
};

export const setOrgSocialDataSaga = function* () {
  try {
    yield debounce(3000, setSocial, setSocialData);
  } catch (e) {
    console.error(String(e));
  }
};

export const setOrgLandingDataSaga = function* () {
  try {
    yield debounce(3000, setLanding, setLandingData);
  } catch (e) {
    console.error(String(e));
  }
};

const setSocialData = function* (action: ISagaAction<any>): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    yield call(saveSocialData, organizationId, action.payload);
  } catch (e) {
    console.error(String(e));
  }
};

const setLandingData = function* (action: ISagaAction<any>): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    yield call(saveLandingData, organizationId, action.payload);
  } catch (e) {
    console.error(String(e));
  }
};

export default fetchOrganizationSaga;
