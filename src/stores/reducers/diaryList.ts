import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';
import { DeleteDiaryAction } from '../actions/diaryList';

export interface DiaryListState {
  diaries: Diary[];
  diaryTotalNum: number;
}

const initialState: DiaryListState = {
  diaries: [],
  diaryTotalNum: 0,
};

const removeDiary = (
  state: DiaryListState,
  action: DeleteDiaryAction
): DiaryListState => {
  const { objectID } = action;
  return {
    ...state,
    diaries: state.diaries.filter(item => item.objectID !== objectID),
    diaryTotalNum: state.diaryTotalNum - 1,
  };
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
    case Types.DELETE_DIARY:
      return removeDiary(state, action);
    default:
      return state;
  }
};

export default diaryList;
