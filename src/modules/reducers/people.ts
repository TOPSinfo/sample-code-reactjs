import { createReducer } from "redux-act";
import {
  setFetchedPeopleList,
  setFetchedProfile,
  // fetchPeopleList,
  setSelectedPeople,
  updatePeopleToTeam,
  removeTeamPeople,
  addNewPeopleToTeam,
  setDoubleClickSelectedPeople
} from "modules/actions";
export interface IPeopleUserList {
  roles?: string[] | undefined;
  organizationId: string;
  uid: string;
  e: IPeople[];
}
export interface IPeople {
  firstName: string;
  email: string;
  lastName: string;
  jobTitle?: string;
  organizationId?: string;
  uid?: string;
  companyName: string;
  description: string;
  workLocation: string;
  imageSrc: string;
}

export interface IPeopleListReducer {
  userList: IPeopleUserList[];
  isfetching: boolean;
  selectedPeople: any;
  selectedProfile: any;
  doubleClicked: boolean;
}

const initialState = {
  userList: [],
  isfetching: false,
  selectedPeople: null,
  selectedProfile: null,
  doubleClicked: false
};

export const people = createReducer<IPeopleListReducer>({}, initialState);

people.on(
  setFetchedPeopleList,
  (state: IPeopleListReducer, payload: IPeopleUserList[]) => ({
    ...state,
    userList: payload,
    isfetching: false
  })
);

people.on(setFetchedProfile, (state: IPeopleListReducer, payload: any) => ({
  ...state,
  selectedProfile: payload
}));

// people.on(fetchPeopleList, (state: IPeopleListReducer) => ({
//   ...state,
//   isfetching: true
// }));

people.on(setSelectedPeople, (state: IPeopleListReducer, payload: any) => ({
  ...state,
  selectedPeople: payload
}));

people.on(updatePeopleToTeam, (state: IPeopleListReducer, payload: any) => ({
  ...state,
  userList: updateUserListById(state.userList, payload)
}));

people.on(removeTeamPeople, (state: IPeopleListReducer, payload: any) => ({
  ...state,
  userList: removeUserFromTeamList(state.userList, payload)
}));

people.on(addNewPeopleToTeam, (state: IPeopleListReducer, payload: any) => ({
  ...state,
  userList: addNewUserToList(state.userList, payload)
}));

people.on(
  setDoubleClickSelectedPeople,
  (state: IPeopleListReducer, payload: any) => ({
    ...state,
    selectedPeople: payload.data,
    doubleClicked: payload.status
  })
);
const addNewUserToList = (userlist: any[], payload: any) => {
  const array = [
    ...userlist,
    {
      ...payload
    }
  ];
  return array;
};

const updateUserListById = (userlist: any[], payload: any) => {
  let array: any = userlist;
  array = array.map((obj: any) =>
    obj.id === payload.id
      ? {
          ...obj,
          ...payload
        }
      : obj
  );
  return array;
};

const removeUserFromTeamList = (userlist: any[], payload: any) => {
  return userlist.filter((value) => value.id !== payload.id);
};
