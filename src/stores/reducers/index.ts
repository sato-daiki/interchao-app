import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import user from './user';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({ user });

export default persistReducer(rootPersistConfig, rootReducer);