import { createReducer } from "redux-act";
import {
  setEventFriendlyName,
  setEventFriendlyNameError,
  setEventFriendlyNameLocally,
  setEventFriendlyNameSuccess
} from "modules/actions";
export interface IEventRoutingReducerState {
  eventFriendlyName: string;
  eventFriendlyNameError: string;
  eventFriendlyNameSuccess: string;
}

const initialState: IEventRoutingReducerState = {
  eventFriendlyName: "",
  eventFriendlyNameError: "",
  eventFriendlyNameSuccess: ""
};

export const eventRouting = createReducer<IEventRoutingReducerState>(
  {},
  initialState
);
eventRouting.on(
  setEventFriendlyNameError,
  (state: IEventRoutingReducerState, payload: string) => ({
    ...state,
    eventFriendlyNameError: payload,
    eventFriendlyNameSuccess: ""
  })
);
eventRouting.on(
  setEventFriendlyNameSuccess,
  (state: IEventRoutingReducerState, payload: string) => ({
    ...state,
    eventFriendlyNameError: "",
    eventFriendlyNameSuccess: payload
  })
);

eventRouting.on(
  setEventFriendlyName,
  (
    state: IEventRoutingReducerState,
    payload: { eventId: string; friendlyUrl: string }
  ) => ({
    eventFriendlyNameSuccess: "",
    eventFriendlyNameError: "",
    eventFriendlyName: payload.friendlyUrl
      .toLowerCase()
      .replace(/[^\w\s]/gi, "-")
      .split(" ")
      .join("-")
  })
);

eventRouting.on(
  setEventFriendlyNameLocally,
  (state: IEventRoutingReducerState, payload: { friendlyUrl: string }) => ({
    eventFriendlyNameSuccess: "",
    eventFriendlyNameError: "",
    eventFriendlyName: payload.friendlyUrl
      .toLowerCase()
      .replace(/[^\w\s]/gi, "-")
      .split(" ")
      .join("-")
  })
);
