import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';

export interface DraftDiaryListState {
  draftDiaries: Diary[];
  draftDiaryTotalNum: number;
}

const initialState: DraftDiaryListState = {
  draftDiaries: [],
  draftDiaryTotalNum: 0,
};

const draftDiaryList = (state = initialState, action: Actions) => {
  switch (action.type) {
    case Types.SET_DRAFT_DIARIES:
      return {
        ...state,
        draftDiaries: action.draftDiaries,
      };
    case Types.SET_DRAFT_DIARY_TOTAL_NUM:
      return {
        ...state,
        draftDiaryTotalNum: action.draftDiaryTotalNum,
      };
    case Types.ADD_DRAFT_DIARY:
      return {
        ...state,
        draftDiaries: [action.draftDiary, ...state.draftDiaries],
        draftDiaryTotalNum: state.draftDiaryTotalNum + 1,
      };

    default:
      return state;
  }
};

export default draftDiaryList;
