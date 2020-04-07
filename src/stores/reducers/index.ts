import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import localStatus from './localStatus';
import user from './user';
import profile from './profile';
import diaryList from './diaryList';
import draftDiaryList from './draftDiaryList';
import teachDiaryList from './teachDiaryList';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  localStatus,
  user,
  profile,
  diaryList,
  draftDiaryList,
  teachDiaryList,
});

export default persistReducer(rootPersistConfig, rootReducer);
