import { createReducer } from "redux-act";
import {
  setSelectedConversation,
  redirectToConversationList,
  setFetchedConversationList,
  setConversationViewType,
  setFetchingConversationFlag
} from "modules/actions";
import {
  IConversationList,
  IEventSavingStatus
} from "modules/types/globals";
import { sortGetRecentItems } from "modules/utils";
export interface IConversationsReducer {
  conversationList: IConversationList[];
  isfetching: boolean;
  filterOptions: any;
  duplicateConversationList: IConversationList[];
  conversationListViewType: string;
  selectedConversationId: IConversationList | null;
  isRedirectToConversationList: boolean;
  userList: any[];
  isCompLoader: IEventSavingStatus;
}

const initialState = {
  conversationList: [],
  isfetching: false,
  filterOptions: null,
  duplicateConversationList: [],
  conversationListViewType: "grid",
  selectedConversationId: null,
  isRedirectToConversationList: false,
  userList: [],
  isCompLoader: { isChangeLoader: false, isSavedloader: false }
};

export const conversations = createReducer<IConversationsReducer>(
  {},
  initialState
);

conversations.on(
  setFetchedConversationList,
  (state: IConversationsReducer, payload: IConversationList[]) => ({
    ...state,
    conversationList: sortGetRecentItems(payload, {
      count: payload.length,
      sortKey: "updatedAt"
    }),
    duplicateConversationList: payload,
    totalEvents: payload.length,
    isfetching: false,
    filterOptions: null
  })
);

conversations.on(
  setSelectedConversation,
  (state: IConversationsReducer, payload: IConversationList | null) => {
    return {
      ...state,
      selectedConversationId: payload
    };
  }
);

conversations.on(setFetchingConversationFlag, (state: IConversationsReducer, payload: boolean) => ({
  ...state,
  isfetching: payload
}));

conversations.on(
  redirectToConversationList,
  (state: IConversationsReducer, payload: boolean) => {
    return {
      ...state,
      isRedirectToConversationList: payload
    };
  }
);

conversations.on(setConversationViewType, (state: IConversationsReducer, payload: string) => {
  return {
    ...state,
    conversationListViewType: payload
  };
});
