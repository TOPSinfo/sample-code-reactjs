import { IStoreState } from "modules/types";

export const getEventFriendlyName = (state: IStoreState) =>
  state.eventRouting.eventFriendlyName;
export const getEventFriendlyNameError = (state: IStoreState) =>
  state.eventRouting.eventFriendlyNameError;
export const getEventFriendlyNameSuccess = (state: IStoreState) =>
  state.eventRouting.eventFriendlyNameSuccess;
