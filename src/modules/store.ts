import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import * as reducers from "modules/reducers";
import rootSaga from "modules/sagas";

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

if (process.env.REACT_APP_ENVIRONMENT === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore(
  combineReducers(reducers as any),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
