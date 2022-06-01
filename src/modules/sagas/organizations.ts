import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import {
  fetchOrganizationsSuccess,
  resetOrganizationData,
  authUserSuccess,
  setContractId
} from "modules/actions";
import { ISagaAction } from "modules/types";
import {
  fecthOrganizationsInContact,
  createNewOrganizationInContract
} from "modules/utils/Firebase/Contracts";
import * as selectors from "../selectors";
import { saveLastUserSelection } from "modules/utils/Firebase/UserManagement/User";
import { toast } from "react-toastify";

export const fetchOrganizationsSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const contractId = yield select(selectors.getContractId);
    const organizationId = yield select(selectors.getOrganizationId);
    const uid = yield select(selectors.getUserUid);
    const organizationIds = yield call(fecthOrganizationsInContact, contractId);

    if (organizationIds && organizationIds.length) {
      if (
        action.payload.changeOrg &&
        organizationId !== organizationIds[0].id
      ) {
        yield put(resetOrganizationData());
        yield put(authUserSuccess({ organizationId: organizationIds[0].id }));
        yield call(
          saveLastUserSelection,
          uid,
          contractId,
          organizationIds[0].id
        );
      }
      yield put(setContractId(contractId));
      yield put(fetchOrganizationsSuccess(organizationIds));
    }
  } catch (e) {
    console.error(String(e));
  }
};

export const createNewOrganizationSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const orgName = action.payload;
    const contractId = yield select(selectors.getContractId);
    const userId = yield select(selectors.getUserUid);
    const organizationId = yield call(
      createNewOrganizationInContract,
      contractId,
      orgName,
      userId
    );

    toast.success("Organization was created successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    const organizationIds = yield call(fecthOrganizationsInContact, contractId);

    if (organizationIds) yield put(fetchOrganizationsSuccess(organizationIds));

    yield put(resetOrganizationData());
    yield put(
      authUserSuccess({
        organizationId
      })
    );
  } catch (e) {
    console.error(String(e));
  }
};
