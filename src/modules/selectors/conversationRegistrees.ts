import { IStoreState } from "../types";

export const getConversationRegistees = (state: IStoreState) =>
  state.conversationRegistrees.registrees;

export const getConversationRegisteesSelectedRow = (state: IStoreState) =>
  state.conversationRegistrees.selectedRow;
