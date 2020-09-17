import { CombinedState, combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, createTransform } from 'redux-persist';

import JSOG from 'jsog';
import localStatus from './localStatus';
import user from './user';
import profile from './profile';
import diaryList, { DiaryListState } from './diaryList';
import teachDiaryList, { TeachDiaryListState } from './teachDiaryList';

import { Types } from '../types';
import { Actions } from '../../types/state';
import { LocalStatus, Profile, User } from '../../types';

const JSOGTransform = createTransform(
  inboundState => JSOG.encode(inboundState),
  outboundState => JSOG.decode(outboundState)
);

type State = CombinedState<{
  localStatus: LocalStatus;
  user: {} | User;
  profile: {} | Profile;
  diaryList: DiaryListState;
  teachDiaryList: TeachDiaryListState;
}>;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localStatus', 'user', 'profile'],
  blackList: ['diaryList', 'teachDiaryList'],
  // これやらないとエラーで落ちる
  transforms: [JSOGTransform],
};

const appReducer = combineReducers({
  localStatus,
  user,
  profile,
  diaryList,
  teachDiaryList,
});

const rootReducer = (
  state: State | undefined,
  action: Actions
): CombinedState<State> => {
  if (action.type === Types.SIGN_OUT) {
    AsyncStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
