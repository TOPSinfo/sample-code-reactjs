import { IStoreState } from "modules/types";

export const getEventState = (state: IStoreState) =>
  state.createEventState.createdEventState;

export const getCreateEventErrorState = (state: IStoreState) =>
  state.createEventState.createdEventErrorState;

export const getFieldEventErrorState = (state: IStoreState) =>
  state.createEventState.createdFieldEventErrorState;
