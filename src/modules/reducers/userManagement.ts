import { createReducer } from "redux-act";
import {
  setFecthedUserList,
  fetchUserList,
  setSelectedTeamUser,
  updateTeamUser,
  removeTeamUser,
  addNewUserToTeam,
  setdoubleClickSelectedTeamUser
} from "modules/actions";
import { IUser } from "modules/types/globals";
export interface IUserList {
  roles?: string[] | undefined;
  organizationId: string;
  uid: string;
  user: IUser[];
}

export interface IUserManagementReducer {
  userList: IUserList[];
  isfetching: boolean;
  selectedTeamUser: any;
  doubleClicked: boolean;
}

const initialState = {
  userList: [],
  isfetching: false,
  selectedTeamUser: null,
  doubleClicked: false
};

export const userManagement = createReducer<IUserManagementReducer>(
  {},
  initialState
);

userManagement.on(
  setFecthedUserList,
  (state: IUserManagementReducer, payload: IUserList[]) => ({
    ...state,
    userList: payload,
    isfetching: false
  })
);

userManagement.on(fetchUserList, (state: IUserManagementReducer) => ({
  ...state,
  isfetching: true
}));

userManagement.on(
  setSelectedTeamUser,
  (state: IUserManagementReducer, payload: IUserList | null) => ({
    ...state,
    selectedTeamUser: payload
  })
);

userManagement.on(
  updateTeamUser,
  (state: IUserManagementReducer, payload: IUserList) => ({
    ...state,
    userList: updateUserListById(state.userList, payload)
  })
);

userManagement.on(
  removeTeamUser,
  (state: IUserManagementReducer, payload: string) => ({
    ...state,
    userList: removeUserFromTeamList(state.userList, payload)
  })
);

userManagement.on(
  addNewUserToTeam,
  (state: IUserManagementReducer, payload: IUserList) => ({
    ...state,
    userList: addNewUserToList(state.userList, payload)
  })
);

userManagement.on(
  setdoubleClickSelectedTeamUser,
  (state: IUserManagementReducer, payload: any) => ({
    ...state,
    selectedTeamUser: payload.data,
    doubleClicked: payload.status
  })
);

const updateUserListById = (userlist: any[], payload: any) => {
  const array: any = userlist;
  return array.map((obj: any) =>
    obj.uid === payload.uid
      ? {
          ...obj,
          roles: payload.roles,
          uid: payload.uid,
          organizationId: payload.organizationId,
          user: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            updatedAt: payload.updatedAt || obj?.user?.updatedAt,
            email: payload.email
          }
        }
      : obj
  );
};

const removeUserFromTeamList = (userlist: any[], payload: any) => {
  return userlist.filter((value) => value.uid !== payload);
};

const addNewUserToList = (userlist: any[], payload: any) => {
  const array = [...userlist, payload];
  return array;
};
