import { createAction } from "redux-act";
import {IConversationList,} from "modules/types/globals";


export const setFetchedConversationList = createAction<IConversationList[]>();

export const setSelectedConversation = createAction<IConversationList | null>(
    "set selected conversation id"
  );
export const setConversationViewType = createAction<string>("Duplicate Conversation");

export const savingConversationData = createAction<any>(
    "save current conversation data actions"
  );

export const redirectToConversationList = createAction<boolean>(
    "redirect to conversation list once coversation added"
  );

export const storeConversationDataWithoutDebounce = createAction<any>(
    "Store Conversation data without debounce"
  );

export const deleteConversation = createAction<any>("remove conversation data actions");
  
export const setFetchingConversationFlag = createAction<boolean>();

export const fetchConversationList = createAction();

export const copyConversation = createAction<any>("copy conversation data actions");
  
