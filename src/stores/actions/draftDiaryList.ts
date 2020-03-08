import { Action } from 'redux';
import { Types } from '../types';
import { Diary } from '../../types';

export interface SetDraftDiariesAction extends Action {
  type: Types.SET_DRAFT_DIARIES;
  draftDiaries: Diary[];
}

export const setDraftDiaries = (
  draftDiaries: Diary[]
): SetDraftDiariesAction => ({
  type: Types.SET_DRAFT_DIARIES,
  draftDiaries,
});

export interface SetDraftDiaryTotalNumAction extends Action {
  type: Types.SET_DRAFT_DIARY_TOTAL_NUM;
  draftDiaryTotalNum: number;
}

export const setDraftDiaryTotalNum = (
  draftDiaryTotalNum: number
): SetDraftDiaryTotalNumAction => ({
  type: Types.SET_DRAFT_DIARY_TOTAL_NUM,
  draftDiaryTotalNum,
});

export interface AddDraftDiaryAction extends Action {
  type: Types.ADD_DRAFT_DIARY;
  draftDiary: Diary;
}

export const addDraftDiary = (draftDiary: Diary): AddDraftDiaryAction => ({
  type: Types.ADD_DRAFT_DIARY,
  draftDiary,
});
