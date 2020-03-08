import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';

export interface DiaryListState {
  diaries: Diary[];
  diaryTotalNum: number;
}

const initialState: DiaryListState = {
  diaries: [],
  diaryTotalNum: 0,
};

const diaryList = (state = initialState, action: Actions) => {
  switch (action.type) {
    case Types.SET_DIARIES:
      return {
        ...state,
        diaries: action.diaries,
      };
    case Types.SET_DIARY_TOTAL_NUM:
      return {
        ...state,
        diaryTotalNum: action.diaryTotalNum,
      };
    case Types.ADD_DIARY:
      return {
        ...state,
        diaries: [action.diary, ...state.diaries],
        diaryTotalNum: state.diaryTotalNum + 1,
      };

    default:
      return state;
  }
};

export default diaryList;
