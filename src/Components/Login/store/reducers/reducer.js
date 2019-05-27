import t from '../actions/types';

export default function(
  state = {
    isAuthenticated: false,
    profile: {},
  },
  action
) {
  switch (action.type) {
    case t.INIT_AUTH:
      return action.payload;
    case t.HANDLE_AUTHENTICATION_PARSE:
      return action.payload;
    case t.LOGIN:
      if (action.payload) {
        state.isAuthenticated = true;
      }
      return { ...state };
    case t.LOGOUT:
      state.isAuthenticated = false;
      return { ...state };
    case t.CHECK_AUTH:
      state.isAuthenticated = true;
      return { ...state };
    case t.GET_PROFILE:
      state.profile = action.payload;
      return { ...state };
    default:
      return state;
  }
}
