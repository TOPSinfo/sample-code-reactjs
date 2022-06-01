import { createReducer } from "redux-act";
import {
  removeCurrentConversationId,
  setConversationRegistrees,
  setConversationRegistreesRowSelected
} from "../actions";

export interface IConversationRegistreesReducerState {
  registrees: any[];
  selectedRow: any;
}
const initialState: IConversationRegistreesReducerState = {
  registrees: [],
  selectedRow: null
};

export const conversationRegistrees = createReducer<IConversationRegistreesReducerState>(
  {},
  initialState
);

conversationRegistrees.on(
  setConversationRegistrees,
  (state: IConversationRegistreesReducerState, payload: any) => ({
    ...state,
    registrees: payload
  })
);

conversationRegistrees.on(
  setConversationRegistreesRowSelected,
  (state: IConversationRegistreesReducerState, payload: any) => ({
    ...state,
    selectedRow: payload
  })
);

conversationRegistrees.on(removeCurrentConversationId, () => initialState);
