import { IStoreState } from "modules/types";

export const getConversationsList = (state: IStoreState) => state.conversations.conversationList;

export const getSelectedConversationId = (state: IStoreState) =>
  state.conversations.selectedConversationId;

export const getConversationsTableViewType = (state: IStoreState) =>
  state?.conversations?.conversationListViewType ;

export const getConversationsListFetching = (state: IStoreState) =>
  state.conversations.isfetching;

export const getRedirectedStateToConversationList = (state: IStoreState) =>
  state.conversations.isRedirectToConversationList;