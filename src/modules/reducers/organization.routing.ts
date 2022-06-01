import { createReducer } from "redux-act";
import {
    setDiscoveryFriendlyName,
    setDiscoveryFriendlyNameError,
    setDiscoveryFriendlyNameLocally,
    setDiscoveryFriendlyNameSuccess
} from "modules/actions";
export interface IDiscoveryRoutingReducerState {
    discoveryFriendlyName: string;
    discoveryFriendlyNameError: string;
    discoveryFriendlyNameSuccess: string;
}

const initialState: IDiscoveryRoutingReducerState = {
    discoveryFriendlyName: "",
    discoveryFriendlyNameError: "",
    discoveryFriendlyNameSuccess: ""
};

export const discoveryRouting = createReducer<IDiscoveryRoutingReducerState>(
    {},
    initialState
);
discoveryRouting.on(
    setDiscoveryFriendlyNameError,
    (state: IDiscoveryRoutingReducerState, payload: string) => ({
        ...state,
        discoveryFriendlyNameError: payload,
        discoveryFriendlyNameSuccess: ""
    })
);
discoveryRouting.on(
    setDiscoveryFriendlyNameSuccess,
    (state: IDiscoveryRoutingReducerState, payload: string) => ({
        ...state,
        discoveryFriendlyNameError: "",
        discoveryFriendlyNameSuccess: payload
    })
);

discoveryRouting.on(
    setDiscoveryFriendlyName,
    (
        state: IDiscoveryRoutingReducerState,
        payload: { friendlyUrl: string }
    ) => ({
        discoveryFriendlyNameSuccess: "",
        discoveryFriendlyNameError: "",
        discoveryFriendlyName: payload.friendlyUrl
            .toLowerCase()
            .replace(/[^\w\s]/gi, "-")
            .split(" ")
            .join("-")
    })
);

discoveryRouting.on(
    setDiscoveryFriendlyNameLocally,
    (state: IDiscoveryRoutingReducerState, payload: { friendlyUrl: string }) => ({
        discoveryFriendlyNameSuccess: "",
        discoveryFriendlyNameError: "",
        discoveryFriendlyName: payload.friendlyUrl
            .toLowerCase()
            .replace(/[^\w\s]/gi, "-")
            .split(" ")
            .join("-")
    })
);
