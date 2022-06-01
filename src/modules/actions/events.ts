import { createAction } from "redux-act";
import {
  ISponsorTypes,
  IEventList,
  IEventSavingStatus
} from "modules/types/globals";

export const fetchEventList = createAction();
export const setFetchingFlag = createAction<boolean>();
export const setFecthedEventsList = createAction<IEventList[]>();
export const setEventViewType = createAction<string>("Duplicate Event");
export const setSelectedEvent = createAction<IEventList | null>(
  "set selected event id"
);

export const createNewEvent = createAction<any>("save new event data actions");
export const savingEventData = createAction<any>(
  "save current event data actions"
);
export const deleteEvent = createAction<any>("remove event data actions");
export const restoreEvent = createAction<any>("restore event data actions");
export const redirectToEventList = createAction<boolean>(
  "redirect to event list once event added"
);
export const copyEvent = createAction<any>("copy event data actions");
export const renameEventName = createAction<any>("rename event name");
export const saveSponsorTypes = createAction<any>("Save Sponsor types");
export const addSponsorTypes =
  createAction<ISponsorTypes[]>("add Sponsor Types");
export const fetchSponsorTypes = createAction<any>("fetch SponsorTypes");
export const renamePropertyUpdated = createAction<IEventList>(
  "update reducer event name"
);

export const storeEventDataWithoutDebounce = createAction<any>(
  "Store event data without debounce"
);

export const setAllUsersFromEmails = createAction<any>("remove Sponsor");
export const fetchUserListProfiles = createAction("remove Sponsor");

export const setOnchangeLoader = createAction<IEventSavingStatus>("set loader");

export const fetchGroupLists = createAction("fetching groups list");

export const setAllGroupsList = createAction<any>("grouplist");

export const saveGroupData = createAction<any>("save group data");

export const setSelectedGroup = createAction<any>("selected group data");

export const setSelectValue = createAction<any>("selected value");

export const setEventType = createAction<any>("set event type");
