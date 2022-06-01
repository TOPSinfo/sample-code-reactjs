import { IStoreState } from "modules/types";

export const getInitialTypeFormData = (state: IStoreState) =>
  state.polls && state.polls.pollsTypeFormData;

export const getPollForms = (state: IStoreState) =>
  state.polls && state.polls.pollsList;

export const getPollsFetchStatus = (state: IStoreState) =>
  state.polls && state.polls.isFetchingPolls;

export const getPollModalState = (state: IStoreState) =>
  state.polls && state.polls.pollModal;

export const getPollModalLoading = (state: IStoreState) =>
  state.polls && state.polls.isPollModalLoading;

export const getSelectedRow = (state: IStoreState) =>
  state.polls && state.polls.selectedPoll;
