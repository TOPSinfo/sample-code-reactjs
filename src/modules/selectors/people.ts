import { IStoreState } from "modules/types";
import { sortGetRecentItems } from "modules/utils";

export const getSelectedPeople = (state: IStoreState) =>
  state.people.selectedPeople;

export const getSelectedProfile = (state: IStoreState) =>
  state.people.selectedProfile;

export const getDoubledClickSelectedPeople = (state: IStoreState) =>
  state.people.doubleClicked;

export const getSelectedTabPeopleListArray =
  (selectedTab?: any) => (state: IStoreState) =>
    filterByTab(state.people.userList, selectedTab);

export const getPeopleFetchListStatus = (state: IStoreState) =>
  state.people.isfetching;

function filterByTab(list: any, selectedTab: string) {
  let userList: any[] = [];
  if (selectedTab === "recent") {
    userList = sortGetRecentItems(list, {});
  } else userList = list;
  return userList;
}
