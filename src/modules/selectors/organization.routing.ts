import { IStoreState } from "modules/types";

export const getDiscoveryFriendlyName = (state: IStoreState) =>
    state.discoveryRouting.discoveryFriendlyName;
export const getDiscoveryFriendlyNameError = (state: IStoreState) =>
    state.discoveryRouting.discoveryFriendlyNameError;
export const getDiscoveryFriendlyNameSuccess = (state: IStoreState) =>
    state.discoveryRouting.discoveryFriendlyNameSuccess;
