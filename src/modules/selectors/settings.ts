import { IStoreState } from "modules/types";

export const getSettings = (state: IStoreState) => state.settings.config;
export const getRoute = (state: IStoreState) => state.settings.route;
export const getSidebarState = (state: IStoreState) =>
  state.settings.sidebarState;
