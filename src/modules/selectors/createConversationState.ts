import { IStoreState } from "modules/types";

export const getConversationState = (state: IStoreState) =>
state.createConversationState.createdConversationState;

export const getCreateConversationErrorState = (state: IStoreState) =>
state.createConversationState.createdConversationErrorState;
 
export const getFieldConversationErrorState = (state: IStoreState) =>
state.createConversationState.createdFieldConversationErrorState;


