import { createAction } from "redux-act";
import { IPeopleUserList } from "modules/reducers";

export const fetchProfileByEmail = createAction<any>();
export const setFetchedProfile = createAction<any>();
export const setFetchedPeopleList = createAction<IPeopleUserList[]>();
export const setSelectedPeople = createAction<any>("set selected people");
export const addPeople = createAction<any>(
  "add a special person for organization"
);

export const editPeople = createAction<any>("edit selected person");

export const updatePeopleToTeam = createAction<any>("update person in people");

export const deletePeople = createAction<string>(
  "delete from firebase team user"
);

export const removeTeamPeople = createAction<string>("delete team user");

export const addNewPeopleToTeam = createAction<any>(
  "add new person to profiles"
);
export const setDoubleClickSelectedPeople = createAction<any>(
  "set selected people"
);
