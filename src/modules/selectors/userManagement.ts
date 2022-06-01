import { IStoreState } from "modules/types";

export const fetchingDataStatus = (state: IStoreState) =>
  state.userManagement.isfetching;

export const getFullUserListArray = (state: IStoreState) =>
  state.userManagement.userList;

// new selctores
export const getSelectedTeamuser = (state: IStoreState) =>
  state.userManagement.selectedTeamUser;

export const getDoubleClickSelectedTeamUser = (state: IStoreState) =>
  state.userManagement.doubleClicked;
