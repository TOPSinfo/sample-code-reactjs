import { IStoreState } from "modules/types";
import { sortGetRecentItems } from "modules/utils";
import { createOption } from "modules/utils/commonFn";
import { orderBy } from "lodash";
export const getEventsList = (state: IStoreState) => state.events.eventsList;
export const getEventType = (state: IStoreState) => state.events.eventType;
export const getEventListFetching = (state: IStoreState) =>
  state.events.isfetching;

export const getEventTableViewType = (state: IStoreState) =>
  state.events.eventListViewType;

export const getSelectedEventId = (state: IStoreState) =>
  state.events.selectedEventId;

export const getRedirectedStateToEventList = (state: IStoreState) =>
  state.events.isRedirectToEventList;

export const getAllSponsorTypes =
  (isValueLabel?: boolean) => (state: IStoreState) =>
    manipulateSponsorTypesArray(state.events.sponsorTypes, isValueLabel);

// export const getUserlist = (state: IStoreState) => state.events.userList;
export const getCompLoader = (state: IStoreState) => state.events.isCompLoader;

export const getGrouplist = (state: IStoreState) => state.events.groupList;

export const getSelectedGrouplist = (state: IStoreState) =>
  state.events.selectgroup;

export const getSelectedValue = (state: IStoreState) =>
  state.events.selectValue;

export const getTypeFilteredEventList =
  (type?: string) => (state: IStoreState) => {
    return getEventsBasedOnType(state.events.eventsList, type);
  };

const getEventsBasedOnType = (fullEventList: any, type?: string) => {
  if (type === "recent") {
    return sortGetRecentItems(
      fullEventList.filter((event: any) => !event.isDeleted),
      {}
    ).reverse();
  }
  return fullEventList.filter((x: any) =>
    type === "trash"
      ? x.isDeleted === true
      : x.isDeleted === undefined || !x.isDeleted
  );
};

const manipulateSponsorTypesArray = (
  array: any[],
  isValueLabelFormat?: boolean
) => {
  if (isValueLabelFormat) {
    array = orderBy(array, ["order"], ["asc"]);
    array = array.map((val) => createOption(val?.type));
  }
  return array;
};
