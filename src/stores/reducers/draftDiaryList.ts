import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';
import { DeleteDraftDiaryAction } from '../actions/draftDiaryList';

export interface DraftDiaryListState {
  draftDiaries: Diary[];
  draftDiaryTotalNum: number;
}

const initialState: DraftDiaryListState = {
  draftDiaries: [],
  draftDiaryTotalNum: 0,
};

const editDraftDiary = (
  state: DraftDiaryListState,
  payload: {
    objectID: string;
    draftDiary: Diary;
  }
): DraftDiaryListState => {
  const { objectID, draftDiary } = payload;
  const newDraftDiaries = state.draftDiaries.map(item => {
    if (item.objectID !== objectID) {
      return item;
    }
    return {
      ...item,
      ...draftDiary,
    };
  });
  return {
    ...state,
    draftDiaries: newDraftDiaries,
  };
};

const deleteDraftDiary = (
  state: DraftDiaryListState,
  action: DeleteDraftDiaryAction
): DraftDiaryListState => {
  const { objectID } = action;
  return {
    ...state,
    draftDiaries: state.draftDiaries.filter(item => item.objectID !== objectID),
    draftDiaryTotalNum: state.draftDiaryTotalNum - 1,
  };
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
    case Types.EDIT_DRAFT_DIARY:
      return editDraftDiary(state, action.payload);
    case Types.DELETE_DRAFT_DIARY:
      return deleteDraftDiary(state, action);
    default:
      return state;
  }
};

export default draftDiaryList;
