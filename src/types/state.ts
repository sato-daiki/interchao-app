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
  | SetDraftDiariesAction
  | SetDraftDiaryTotalNumAction
  | AddDraftDiaryAction;
