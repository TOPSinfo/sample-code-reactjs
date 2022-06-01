import { createAction } from "redux-act";
import { IUserList } from "modules/reducers";
export const fetchUserList = createAction();
export const setFecthedUserList = createAction<IUserList[]>();
export const setSelectedTeamUser = createAction<IUserList | null>(
  "set selected event id"
);
export const addAdminUser = createAction<any>(
  "add admin user for organization"
);

export const editAdminUser = createAction<any>("edit admin user for team");

export const updateTeamUser = createAction<IUserList>(
  "update List admin user for team"
);

export const deleteTeamUser = createAction<string>(
  "delete from firebase team user"
);

export const removeTeamUser = createAction<string>("delete team user");

export const addNewUserToTeam = createAction<IUserList>("add new user to list");

export const setdoubleClickSelectedTeamUser = createAction<any>(
  "set selected event id"
);
