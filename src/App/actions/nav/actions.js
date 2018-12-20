import t from "./types";

export const closeNav = () => dispatch => {
  dispatch({ type: t.CLOSE_NAV, payload: false });
};

export const toggleNav = () => dispatch => {
  dispatch({ type: t.TOGGLE_NAV, payload: null });
};

export const toggleActiveTab = route => dispatch => {
  dispatch({ type: t.TOGGLE_ACTIVE_TAB, payload: route });
};

export const authenticated = () => dispatch => {
  dispatch({ type: t.IS_AUTHENTICATED, payload: true });
};
