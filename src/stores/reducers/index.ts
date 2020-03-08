import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import user from './user';
import profile from './profile';
import diaryList from './diaryList';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({ user, profile, diaryList });

export default persistReducer(rootPersistConfig, rootReducer);
