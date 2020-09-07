import {
  ThunkAction as OrgThunkAction,
  ThunkDispatch as OrgThunkDispatch,
} from 'redux-thunk';
import { LocalStatus } from './localStatus';
import { User } from './user';
import { Profile } from './profile';
import { DiaryListState } from '../stores/reducers/diaryList';
import { TeachDiaryListState } from '../stores/reducers/teachDiaryList';
import { SetUserAction } from '../stores/actions/user';
import { SetProfileAction } from '../stores/actions/profile';
import {
  SetDiariesAction,
  SetDiaryTotalNumAction,
  AddDiaryAction,
  EditDiaryAction,
  DeleteDiaryAction,
} from '../stores/actions/diaryList';
import {
  SetTeachDiariesAction,
  EditTeachDiaryAction,
} from '../stores/actions/teachDiaryList';
import {
  SetLocalStatusAction,
  RestoreUidAction,
  SignInAction,
  SignOutAction,
} from '../stores/actions/localStatus';

export interface State {
  rootReducer: {
    localStatus: LocalStatus;
    user: User;
    profile: Profile;
    diaryList: DiaryListState;
    teachDiaryList: TeachDiaryListState;
  };
}

export type Actions =
  | SetLocalStatusAction
  | RestoreUidAction
  | SignInAction
  | SignOutAction
  | SetUserAction
  | SetProfileAction
  | SetDiariesAction
  | SetDiaryTotalNumAction
  | AddDiaryAction
  | EditDiaryAction
  | DeleteDiaryAction
  | SetTeachDiariesAction
  | EditTeachDiaryAction;

export type ThunkAction<R> = OrgThunkAction<R, State, undefined, Actions>;
export type ThunkDispatch = OrgThunkDispatch<State, undefined, Actions>;
