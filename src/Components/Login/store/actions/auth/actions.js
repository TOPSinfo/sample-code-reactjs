import t from './types';
import { Auth } from 'aws-amplify';

export const checkAuthentication = () => async dispatch => {
  let currentSession;
  currentSession = await Auth.currentSession();
  dispatch({ type: t.CHECK_AUTH, payload: currentSession });
};

export const getProfile = () => async dispatch => {
  let currentUser = await Auth.currentAuthenticatedUser();
  dispatch({ type: t.GET_PROFILE, payload: currentUser });
};
