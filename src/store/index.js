import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import history from '../history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancer(applyMiddleware(reduxThunk),applyMiddleware(routerMiddleware(history))),
);