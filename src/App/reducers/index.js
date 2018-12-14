import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import groupsReducer from './groups/reducer';
import projectsReducer from './projects/reducer';
import followersReducer from './followers/reducer';
import navReducer from './nav/reducer';
import workspaceReducer from './workspace/reducer';
import usersReducer from './users/reducer';
import commentsReducer from './comments/reducer';
import invitesReducer from './invites/reducer';
import segmentsReducer from './segments/reducer';
import collaboratorsReducer from './collaborators/reducer';
import chatReducer from './chat/reducer';
import audioReducer from './audio/reducer';
import menuReducer from './menu/reducer';

export default combineReducers({
  audio: audioReducer,
  auth: authReducer,
  users: usersReducer,
  nav: navReducer,
  profile: profileReducer,
  groups: groupsReducer,
  projects: projectsReducer,
  followers: followersReducer,
  workspace: workspaceReducer,
  comments: commentsReducer,
  form: reduxForm,
  invites: invitesReducer,
  segments: segmentsReducer,
  collaborators: collaboratorsReducer,
  chat: chatReducer,
  menu: menuReducer
});
