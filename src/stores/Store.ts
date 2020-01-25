// global __DEV__
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import rootReducer from './reducers';

const reducer = combineReducers({ rootReducer });
const logger = __DEV__ ? [reduxLogger] : [];

const middlewares = applyMiddleware(...logger, thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(middlewares)
);

export function configureStore() {
  const persistor = persistStore(store);
  return { persistor, store };
}