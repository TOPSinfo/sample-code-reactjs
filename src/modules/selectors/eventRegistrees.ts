import { IStoreState } from "../types";

export const getEventRegistees = (state: IStoreState) =>
  state.eventRegistrees.registrees;

export const getEventRegisteesSelectedRow = (state: IStoreState) =>
  state.eventRegistrees.selectedRow;
