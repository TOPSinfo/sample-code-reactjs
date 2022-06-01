import { IStoreState } from "modules/types";

export const getOrganizations = (state: IStoreState) =>
  state.organizations.organizations;
export const getContractId = (state: IStoreState) =>
  state.organizations.contractId;
