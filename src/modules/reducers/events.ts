import { createReducer } from "redux-act";
import moment from "moment-timezone";

import {
  fetchEventList,
  setFecthedEventsList,
  setEventViewType,
  setSelectedEvent,
  redirectToEventList,
  setFetchingFlag,
  renamePropertyUpdated,
  addSponsorTypes,
  // setAllUsersFromEmails,
  setOnchangeLoader,
  setAllGroupsList,
  setSelectedGroup,
  setSelectValue,
  setEventType
} from "modules/actions";
import {
  ISponsorTypes,
  IEventList,
  IEventSavingStatus
} from "modules/types/globals";
import { sortGetRecentItems } from "modules/utils";
moment.suppressDeprecationWarnings = true;
export interface IEventsReducer {
  eventsList: IEventList[];
  isfetching: boolean;
  filterOptions: any;
  duplicateEventsList: IEventList[];
  sponsorTypes: ISponsorTypes[];
  eventListViewType: string;
  selectedEventId: IEventList | null;
  isRedirectToEventList: boolean;
  // userList: any[];
  isCompLoader: IEventSavingStatus;
  groupList: any[];
  selectgroup: {
    value: string;
    priority: number;
    isCheckedPolls: boolean;
    id: string;
  };
  selectValue: boolean;
  eventType: string;
}

const initialState = {
  eventsList: [],
  sponsorTypes: [],
  isfetching: false,
  filterOptions: null,
  duplicateEventsList: [],
  eventListViewType: "grid",
  selectedEventId: null,
  isRedirectToEventList: false,
  // userList: [],
  isCompLoader: { isChangeLoader: false, isSavedloader: false },
  groupList: [],
  selectgroup: {
    value: "",
    priority: 1,
    isCheckedPolls: false,
    id: ""
  },
  selectValue: false,
  eventType: "conversation"
};

export const events = createReducer<IEventsReducer>({}, initialState);

events.on(
  setFecthedEventsList,
  (state: IEventsReducer, payload: IEventList[]) => ({
    ...state,
    eventsList: sortGetRecentItems(payload, {
      count: payload.length,
      sortKey: "updatedAt"
    }),
    duplicateEventsList: payload,
    totalEvents: payload.length,
    isfetching: false,
    filterOptions: null
  })
);

events.on(fetchEventList, (state: IEventsReducer) => ({
  ...state,
  isfetching: true
}));
events.on(setFetchingFlag, (state: IEventsReducer, payload: boolean) => ({
  ...state,
  isfetching: payload
}));

events.on(setEventViewType, (state: IEventsReducer, payload: string) => {
  return {
    ...state,
    eventListViewType: payload
  };
});

events.on(
  setSelectedEvent,
  (state: IEventsReducer, payload: IEventList | null) => {
    return {
      ...state,
      selectedEventId: payload
    };
  }
);
events.on(redirectToEventList, (state: IEventsReducer, payload: boolean) => {
  return {
    ...state,
    isRedirectToEventList: payload
  };
});
events.on(
  addSponsorTypes,
  (state: IEventsReducer, payload: ISponsorTypes[]) => {
    return {
      ...state,
      sponsorTypes: payload
    };
  }
);
events.on(
  renamePropertyUpdated,
  (state: IEventsReducer, payload: IEventList) => {
    return {
      ...state,
      eventsList: updateRenamedEvent(
        sortGetRecentItems(state.eventsList, {
          count: state.eventsList.length,
          sortKey: "updatedAt"
        }),
        payload
      )
    };
  }
);

// events.on(setAllUsersFromEmails, (state: IEventsReducer, payload: any) => {
//   return {
//     ...state,
//     userList: payload
//   };
// });

events.on(
  setOnchangeLoader,
  (state: IEventsReducer, payload: IEventSavingStatus) => {
    return {
      ...state,
      isCompLoader: payload
    };
  }
);

events.on(setAllGroupsList, (state: IEventsReducer, payload: any) => {
  return {
    ...state,
    groupList: payload
  };
});

events.on(setSelectedGroup, (state: IEventsReducer, payload: any) => {
  return {
    ...state,
    selectgroup: payload
  };
});

events.on(setSelectValue, (state: IEventsReducer, payload: any) => {
  return {
    ...state,
    selectValue: payload
  };
});

events.on(setEventType, (state: IEventsReducer, payload: string) => {
  return {
    ...state,
    eventType: payload
  };
});

const updateRenamedEvent = (array: IEventList[], payload: any) => {
  const updatedArray: any[] = array.map((value: IEventList) => {
    if (value.id === payload.eventId) value.name = payload.name;
    return value;
  });
  return updatedArray;
};
