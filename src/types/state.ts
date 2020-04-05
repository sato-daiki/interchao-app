import {
  ThunkAction as OrgThunkAction,
  ThunkDispatch as OrgThunkDispatch,
} from 'redux-thunk';
import { User } from './user';
import { Profile } from './profile';
import { DiaryListState } from '../stores/reducers/diaryList';
import { DraftDiaryListState } from '../stores/reducers/draftDiaryList';
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
  SetDraftDiariesAction,
  SetDraftDiaryTotalNumAction,
  AddDraftDiaryAction,
  EditDraftDiaryAction,
  DeleteDraftDiaryAction,
} from '../stores/actions/draftDiaryList';
import {
  SetTeachDiariesAction,
  EditTeachDiaryAction,
} from '../stores/actions/teachDiaryList';

export interface State {
  rootReducer: {
    user: User;
    profile: Profile;
    diaryList: DiaryListState;
    draftDiaryList: DraftDiaryListState;
    teachDiaryList: TeachDiaryListState;
  };
}

export type Actions =
  | SetUserAction
  | SetProfileAction
  | SetDiariesAction
  | SetDiaryTotalNumAction
  | AddDiaryAction
  | EditDiaryAction
  | DeleteDiaryAction
  | SetDraftDiariesAction
  | SetDraftDiaryTotalNumAction
  | DeleteDraftDiaryAction
  | AddDraftDiaryAction
  | EditDraftDiaryAction
  | SetTeachDiariesAction
  | EditTeachDiaryAction;

export type ThunkAction<R> = OrgThunkAction<R, State, undefined, Actions>;
export type ThunkDispatch = OrgThunkDispatch<State, undefined, Actions>;
