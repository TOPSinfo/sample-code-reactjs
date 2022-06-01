import { createAction } from "redux-act";

export const setEventFriendlyName = createAction<{
  eventId: string;
  startTime: string;
  checkAvailibility?: boolean;
  friendlyUrl: string;
}>("set even friendly name");

export const setEventFriendlyNameLocally = createAction<{
  friendlyUrl: string;
}>("set even friendly name locally");

export const setEventFriendlyNameError = createAction<string>(
  "set even friendly name error"
);
export const setEventFriendlyNameSuccess = createAction<string>(
  "set even friendly name success"
);
export const fetchEventFriendlyName = createAction<{ eventId: string }>(
  "fech event Friendly Name"
);
