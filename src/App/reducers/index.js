import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import profileReducer from './profile/reducer';
import navReducer from './nav/reducer';

export default combineReducers({
  nav: navReducer,
  profile: profileReducer,
  form: reduxForm
});
