import { createReducer } from "redux-act";
import {
  setSettings,
  setRoute,
  sidebarHandler
} from "modules/actions/settings";
import { INavigation, Config } from "modules/types/globals";

export type settingReducerState = {
  config: Config;
  route?: INavigation;
  sidebarState: number;
};

const initialState: settingReducerState = {
  config: {
    header: { display: true },
    footer: { display: true },
    navbar: { display: true }
  },
  sidebarState: 0
};

export const settings = createReducer<settingReducerState>({}, initialState);
settings.on(setSettings, (state: settingReducerState, payload: Config) => ({
  ...state,
  config: payload
}));

settings.on(setRoute, (state: settingReducerState, payload: INavigation) => ({
  ...state,
  route: payload
}));

settings.on(sidebarHandler, (state: settingReducerState, payload: number) => ({
  ...state,
  sidebarState: payload
}));
