import { createReducer } from "redux-act";
import {
  removeCurrentEventId,
  setEventRegistrees,
  setEventRegistreesRowSelected
} from "../actions";

export interface IEventRegistreesReducerState {
  registrees: any[];
  selectedRow: any;
}
const initialState: IEventRegistreesReducerState = {
  registrees: [],
  selectedRow: null
};

export const eventRegistrees = createReducer<IEventRegistreesReducerState>(
  {},
  initialState
);

eventRegistrees.on(
  setEventRegistrees,
  (state: IEventRegistreesReducerState, payload: any) => ({
    ...state,
    registrees: payload
  })
);

eventRegistrees.on(
  setEventRegistreesRowSelected,
  (state: IEventRegistreesReducerState, payload: any) => ({
    ...state,
    selectedRow: payload
  })
);

eventRegistrees.on(removeCurrentEventId, () => initialState);
