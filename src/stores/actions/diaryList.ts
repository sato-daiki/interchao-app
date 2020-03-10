import { Action } from 'redux';
import { Types } from '../types';
import { Diary } from '../../types';

export interface SetDiariesAction extends Action {
  type: Types.SET_DIARIES;
  diaries: Diary[];
}

export const setDiaries = (diaries: Diary[]): SetDiariesAction => ({
  type: Types.SET_DIARIES,
  diaries,
});

export interface SetDiaryTotalNumAction extends Action {
  type: Types.SET_DIARY_TOTAL_NUM;
  diaryTotalNum: number;
}

export const setDiaryTotalNum = (
  diaryTotalNum: number
): SetDiaryTotalNumAction => ({
  type: Types.SET_DIARY_TOTAL_NUM,
  diaryTotalNum,
});

export interface AddDiaryAction extends Action {
  type: Types.ADD_DIARY;
  diary: Diary;
}

export const addDiary = (diary: Diary): AddDiaryAction => ({
  type: Types.ADD_DIARY,
  diary,
});

export interface EditDiaryAction extends Action {
  type: Types.EDIT_DIARY;
  payload: {
    objectID: string;
    diary: Diary;
  };
}

export const editDiary = (objectID: string, diary: Diary): EditDiaryAction => ({
  type: Types.EDIT_DIARY,
  payload: {
    objectID,
    diary,
  },
});

export interface DeleteDiaryAction extends Action {
  type: Types.DELETE_DIARY;
  objectID: string;
}

export const deleteDiary = (objectID: string): DeleteDiaryAction => ({
  type: Types.DELETE_DIARY,
  objectID,
});
