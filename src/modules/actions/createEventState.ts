import { createAction } from "redux-act";
export const setCreateEventState = createAction<any>(
  "manipulate created event state"
);

export const unMountCreateDEventState = createAction(
  "unmount data from reducer"
);

export const setCreateEventErrorState = createAction<any>(
  "set error for created event"
);

export const setEventFieldErrorState = createAction<any>(
  "set error for created event"
);
