import t from '../../actions/profile/types';

export default function (
  state = { profile: {}, pageView: 'projects', sidebarView: 'profile', userId: '', storageFiles: [], publicProfile : {}, userProjects:[] },
  action
) {
  switch (action.type) {
    case t.FETCH_PROFILE:
      return { ...state, profile: action.payload, userId: action.payload.id };
    case t.FETCH_STORAGE_FILES:
      return { ...state, storageFiles: action.payload };
    case t.GET_PROFILE:
      return { ...state, username: action.payload.username };
    case t.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case t.TOGGLE_PAGE_VIEW:
      return { ...state, pageView: action.payload };
    case t.TOGGLE_SIDEBAR_VIEW:
      return { ...state, sidebarView: action.payload };
    case t.INVITE:
      let newState = {
        ...state,
        profile: {
          ...state.profile,
          invites: {
            incoming: state.profile.invites.incoming,
            outgoing: action.payload,
          },
        },
      };
      return newState;
    case t.LOGOUT:
      return {
        profile: {},
        pageView: 'projects',
        userId: '',
      };
    case t.FETCH_USER_AUDIOS:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        userAudios: action.payload,
      };
    case t.UPDATE_USER_STATUS:
      return {
        ...state,
        profile: action.payload.Attributes
      }
    case t.FETCH_PUBLIC_PROFILE:
    console.log('public profile is called', action.payload)
      return {
        publicProfile: action.payload
      }
    case t.FETCH_USER_PROJECTS:
    console.log("FETCH_USER_PROJECTS is called", action.payload)
      return {
        userProjects: action.payload
      }
    default:
      return state;
  }
}
