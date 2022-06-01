import { createAction } from "redux-act";

export const setEventRegistrees = createAction<any>("set event registees");

export const setEventRegistreesRowSelected = createAction<any | null>(
  "set selected event registree row"
);

export const editRowSelected = createAction<any | null>("edit registree row");
export const deleteRowSelected = createAction<any | null>(
  "delete registree row"
);

export const setEventIdEditDatabase = createAction(
  "set event Id for edit database"
);

export const importCsvData = createAction<any>(
  "csv file data import to database"
);

export const clearChat = createAction("clear event chat");
