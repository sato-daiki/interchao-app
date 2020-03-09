import {
  ThunkAction as OrgThunkAction,
  ThunkDispatch as OrgThunkDispatch,
} from 'redux-thunk';
import { User } from './user';
import { Profile } from './profile';
import { DiaryListState } from '../stores/reducers/diaryList';
import { DraftDiaryListState } from '../stores/reducers/draftDiaryList';
import { SetUserAction } from '../stores/actions/user';
import { SetProfileAction } from '../stores/actions/profile';
import {
  SetDiariesAction,
  SetDiaryTotalNumAction,
  AddDiaryAction,
  DeleteDiaryAction,
} from '../stores/actions/diaryList';
import {
  SetDraftDiariesAction,
  SetDraftDiaryTotalNumAction,
  AddDraftDiaryAction,
} from '../stores/actions/draftDiaryList';

export interface State {
  rootReducer: {
    user: User;
    profile: Profile;
    diaryList: DiaryListState;
    draftDiaryList: DraftDiaryListState;
  };
}

export type Actions =
  | SetUserAction
  | SetProfileAction
  | SetDiariesAction
  | SetDiaryTotalNumAction
  | AddDiaryAction
  | DeleteDiaryAction
  | SetDraftDiariesAction
  | SetDraftDiaryTotalNumAction
  | AddDraftDiaryAction;

export type ThunkAction<R> = OrgThunkAction<R, State, undefined, Actions>;
export type ThunkDispatch = OrgThunkDispatch<State, undefined, Actions>;
