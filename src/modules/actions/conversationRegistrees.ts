import { createAction } from "redux-act";

export const setConversationIdEditDatabase = createAction(
    "set event Id for edit database"
  );

export const setConversationRegistrees = createAction<any>("set conversation registees");
  
export const importCsvConversationData = createAction<any>(
  "csv file data import to database"
);

export const editConversationRowSelected = createAction<any | null>("edit registree row");

export const clearChatConversation = createAction("clear conversation chat");

export const setConversationRegistreesRowSelected = createAction<any | null>(
  "set selected conversation registree row"
);

export const deleteConversationRowSelected = createAction<any | null>(
  "delete registree row"
);

