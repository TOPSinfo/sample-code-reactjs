import { createReducer } from "redux-act";
import { fetchOrganizationsSuccess, setContractId } from "modules/actions";

type IOrganization = {
  name: string;
  id: string;
};
export type organizationsReducerState = {
  organizations: IOrganization[];
  contractId: string;
};

const initialState: organizationsReducerState = {
  organizations: [],
  contractId: ""
};

export const organizations = createReducer<organizationsReducerState>(
  {},
  initialState
);
organizations.on(
  fetchOrganizationsSuccess,
  (state: organizationsReducerState, payload: IOrganization[]) => ({
    ...state,
    organizations: payload
  })
);

organizations.on(
  setContractId,
  (state: organizationsReducerState, payload: string) => ({
    ...state,
    contractId: payload
  })
);
