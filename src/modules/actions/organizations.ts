import { createAction } from "redux-act";

export const fetchOrganizationsByContractId =
  createAction<any>("Fetch Organization");
export const fetchOrganizationsSuccess = createAction<any>(
  "Fetch Organizations Success"
);
export const setContractId = createAction<string>("set contract id");
export const createOrganization = createAction<string>("Create Organization");
