import { IStoreState } from "modules/types";

export const getOrganizationID = (state: IStoreState) =>
  state.organization && state.organization.organization.id;

export const getOrganizationName = (state: IStoreState) =>
  state.organization && state.organization.organization.name;
export const getFilterValue = (state: IStoreState) =>
  state.organization.organization.filterValue;
export const getOrganizationPlanFeature = (state: IStoreState) =>
  state.organization && state.organization.organization.plan;
export const getLandingPageState = (state: IStoreState) =>
  state.organization && state.organization.organization.landing;
