import { IStoreState } from "modules/types";

export const getConversationComponentViewType = (state: IStoreState) =>
state.conversationComponentNew.conversationComponentViewType;

export const getAllConversationComponents = (state: IStoreState) =>
state.conversationComponentNew.conversationComponents;

export const getSelectedConversationComponents = (state: IStoreState) =>
state.conversationComponentNew.selectedRow;

export const getFetchingConversationCompStatus = (state: IStoreState) =>
state.conversationComponentNew.fetchingConversationComp;

export const getCurrentConversationId = (state: IStoreState) =>
state.conversationComponentNew.conversationId;

export const getConversationComponentData = (state: IStoreState) =>
state.conversationComponentNew.conversationComponentData;

export const getConversationSpeakerData = (state: IStoreState) =>
state.conversationComponentNew.conversationSpeakerData;

export const getUserData = (state: IStoreState) => 
state.conversationComponentNew.userList;