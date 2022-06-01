import { createAction } from "redux-act";
import {
  ICreateEventProperty,
  IEventComponentsNew
} from "modules/types/globals";

export const fetchEventComponents = createAction<{ eventId: string }>(
  "fech event Friendly Name"
);

export const setEventComponentsNew = createAction<IEventComponentsNew[]>(
  "fech event Friendly Name"
);

export const setEventComponentsRowSelectedNew =
  createAction<IEventComponentsNew | null>("fech event Friendly Name");

export const saveCreatedEventComponent = createAction<any>(
  "save created event component"
);

export const deleteEvenComponent = createAction<any>("delete  event component");

export const copyEventComponent = createAction<any>("delete  event component");

export const createEventComponentActions = createAction<
  ICreateEventProperty | any
>("manipulate create event data");

export const unMountEventState = createAction("unmount u event data");

export const addBreakoutData = createAction<any>("adding breakout data");

export const setDoubleClickEventComponentsRowSelected = createAction<any>(
  "control double click data and modal view"
);
export const setBroadcastChannel = createAction<any>("set broadcast channel");

export const createBroadcastChannel = createAction<{
  eventId: string;
  isCreate: boolean;
}>("create broadcast channel");

export const createShoFlo =
  createAction<{
    eventId: string;
    isCopyShoFlo?: boolean;
    isCopySpeakerUrl?: boolean;
  }>("create shoflo");

export const fetchBroadcastChannel = createAction<{ eventId: string }>(
  "fetch broadcast channel"
);

export const setEventComponentViewType = createAction<string>(
  "fetch broadcast channel"
);

export const setCurrentEventId = createAction<string>(
  "set event id for event component"
);

export const removeCurrentEventId = createAction(
  "remove event id for event component"
);

export const controlDoubleClick = createAction<boolean>(
  "control double click state"
);

export const createEventApi = createAction<any>("control double click state");
export const updateLobbyKeynote = createAction<any>(
  "control double click state"
);

export const createdEventSuccess = createAction<boolean>(
  "event created status"
);
