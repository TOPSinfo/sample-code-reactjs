import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import profileReducer from '../Components/Profile/store/reducers/reducer';
import navReducer from '../Components/Home/store/reducers/reducer';
import authReducer from '../Components/Login/store/reducers/reducer';
import history from '../history'

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  profile: profileReducer,
  router: connectRouter(history)
});
