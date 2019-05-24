import t from "../../actions/nav/types";

export default function(
  state = { navExpanded: false, activeTab: "/", isAuthenticated: false },
  action
) {
  switch (action.type) {
    case t.CLOSE_NAV:
      return { ...state, navExpanded: false };
    case t.TOGGLE_NAV:
      return { ...state, navExpanded: !state.navExpanded };
    case t.TOGGLE_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case t.LOGOUT: 
      return { navExpanded: false, activeTab: "/" };
    case t.IS_AUTHENTICATED: 
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}
