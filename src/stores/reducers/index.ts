import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer, createTransform } from 'redux-persist';

import JSOG from 'jsog';
import localStatus from './localStatus';
import user from './user';
import profile from './profile';
import diaryList from './diaryList';
import teachDiaryList from './teachDiaryList';

const JSOGTransform = createTransform(
  inboundState => JSOG.encode(inboundState),
  outboundState => JSOG.decode(outboundState)
);

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localStatus', 'user', 'profile'],
  transforms: [JSOGTransform],
};

const rootReducer = combineReducers({
  localStatus,
  user,
  profile,
  diaryList,
  teachDiaryList,
});

export default persistReducer(rootPersistConfig, rootReducer);
