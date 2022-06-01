import { SagaIterator } from "redux-saga";
import { call, debounce, put, select } from "redux-saga/effects";
import {
    setDiscoveryFriendlyName,
    setDiscoveryFriendlyNameError,
    setDiscoveryFriendlyNameLocally,
    setDiscoveryFriendlyNameSuccess
} from "../actions";
import { ISagaAction } from "../types";
import * as orgRoutingApi from "../utils/Firebase/organizationRouting";
import { getOrganizationId } from "modules/selectors";

export const throttleSaveDiscoveryFriendlyComponents = function* (): SagaIterator {
    try {
        yield debounce(3000, setDiscoveryFriendlyName, saveDiscoveryFriendlyName);
    } catch (e) {
        console.error(String(e));
    }
};

export const saveDiscoveryFriendlyName = function* (
    action: ISagaAction<any>
): SagaIterator {
    try {
        const organizationId = yield select(getOrganizationId);
        const friendlyUrl = action.payload.friendlyUrl
            .toLowerCase()
            .split(" ")
            .join("-");
        if (friendlyUrl) {
            const isExist = yield call(
                orgRoutingApi.checkDiscoveryNameExist,
                organizationId,
                friendlyUrl
            );
            if (isExist) {
                yield put(setDiscoveryFriendlyNameError("This path is already taken"));
            } else {
                yield call(
                    orgRoutingApi.saveDiscoveryFriendlyName,
                    organizationId,
                    friendlyUrl
                );
                yield put(
                    setDiscoveryFriendlyNameSuccess("This path is available and has been saved")
                );
            }
        } else {
            if (action.payload.checkAvailibility) yield put(setDiscoveryFriendlyNameError("Please enter valid path."));
        }
    } catch (e) {
        console.error(String(e));
    }
};

export const getDiscoveryFriendlyName = function* (): SagaIterator {
    const organizationId = yield select(getOrganizationId);
    const friendlyNameRoutingObj = yield call(
        orgRoutingApi.getDiscoveryFriendlyName,
        organizationId
    );
    yield put(setDiscoveryFriendlyNameLocally(friendlyNameRoutingObj || { friendlyUrl: "" }))
}