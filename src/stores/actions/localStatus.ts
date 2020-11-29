import { Action } from 'redux';
import { LocalStatus, MyDiaryListView } from '../../types/localStatus';
import { Types } from '../types';

export interface SetLocalStatusAction extends Action {
  type: Types.SET_LOCAL_STATUS;
  localStatus: LocalStatus;
}

export const setLocalStatus = (
  localStatus: LocalStatus
): SetLocalStatusAction => ({
  type: Types.SET_LOCAL_STATUS,
  localStatus,
});

export interface SetUnreadCorrectionNumAction extends Action {
  type: Types.SET_UNREAD_CORRECTION_NUM;
  unreadCorrectionNum: number;
}

export const setUnreadCorrectionNum = (
  unreadCorrectionNum: number
): SetUnreadCorrectionNumAction => ({
  type: Types.SET_UNREAD_CORRECTION_NUM,
  unreadCorrectionNum,
});

export interface SetMyDiaryListViewAction extends Action {
  type: Types.SET_MY_DIARY_LIST_VIEW;
  myDiaryListView: MyDiaryListView;
}

export const setMyDiaryListView = (
  myDiaryListView: MyDiaryListView
): SetMyDiaryListViewAction => ({
  type: Types.SET_MY_DIARY_LIST_VIEW,
  myDiaryListView,
});

export interface RestoreUidAction extends Action {
  type: Types.RESTORE_UID;
  uid: string | null;
}

export const restoreUid = (uid: string | null): RestoreUidAction => ({
  type: Types.RESTORE_UID,
  uid,
});

export interface SignInAction extends Action {
  type: Types.SIGN_IN;
  uid: string;
}

export const signIn = (uid: string): SignInAction => ({
  type: Types.SIGN_IN,
  uid,
});

export interface SignOutAction extends Action {
  type: Types.SIGN_OUT;
}

export const signOut = (): SignOutAction => ({
  type: Types.SIGN_OUT,
});
