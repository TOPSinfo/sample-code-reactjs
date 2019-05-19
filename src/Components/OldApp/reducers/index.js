import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import profileReducer from './profile/reducer';
import navReducer from './nav/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  profile: profileReducer,
  form: reduxForm
});
