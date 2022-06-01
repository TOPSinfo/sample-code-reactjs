import { createAction } from "redux-act";

export const setDiscoveryFriendlyName = createAction<{
    checkAvailibility?: boolean;
    friendlyUrl: string;
}>("set discovery friendly name");

export const setDiscoveryFriendlyNameLocally = createAction<{
    friendlyUrl: string;
}>("set discovery friendly name locally");

export const setDiscoveryFriendlyNameError = createAction<string>(
    "set discovery friendly name error"
);
export const setDiscoveryFriendlyNameSuccess = createAction<string>(
    "set discovery friendly name success"
);
export const fetchDiscoveryFriendlyName = createAction<string>(
    "fetch discovery friendly Name"
);