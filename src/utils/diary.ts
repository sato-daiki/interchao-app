import moment from 'moment';
import 'moment/locale/ja';
import {
  DiaryStatus,
  CorrectionStatus,
  Timestamp,
  Language,
  Profile,
  DisplayProfile,
  Comment,
  InfoComment,
  Diary,
} from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';
import firebase from '../constants/firebase';

interface Status {
  text: string;
  color: string;
}

/** algoliaから取得した時とfirestoreから取得したときは方が異なるで別で関数を用意する */
export const getAlgoliaDay = (timestamp: Timestamp): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp).format('Y-M-D');
};

export const getDay = (timestamp: firebase.firestore.Timestamp): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp.toDate()).format('Y-M-D');
};

export const getAlgoliaDate = (timestamp: Timestamp): string => {
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp || !timestamp._seconds) {
    return '';
  }
  // eslint-disable-next-line no-underscore-dangle
  return moment.unix(timestamp._seconds).format('Y-M-D H:m');
};

// 日記一覧に出力するステータスの取得
export const getUserDiaryStatus = (
  correctionStatus: CorrectionStatus
): Status | null => {
  if (correctionStatus === 'yet') {
    return { text: '未添削', color: mainColor };
  }

  if (correctionStatus === 'doing') {
    return { text: '添削中', color: subTextColor };
  }

  return null;
};

export const getMyDiaryStatus = (
  diaryStatus: DiaryStatus,
  correctionStatus: CorrectionStatus,
  isReview: boolean
): Status | null => {
  if (diaryStatus === 'publish') {
    if (correctionStatus === 'yet' || correctionStatus === 'doing') {
      return { text: '添削待ち', color: subTextColor };
    }
    if (correctionStatus === 'unread') {
      return { text: '未読', color: softRed };
    }
    if (correctionStatus === 'done') {
      if (!isReview) {
        return { text: 'レビュー待ち', color: mainColor };
      }
    }
  }
  return null;
};

export const getlanguage = (language: Language): string => {
  switch (language) {
    case 'ja':
      return '日本語';
    case 'en':
      return '英語';
    default:
      return '';
  }
};

export const getExceptUser = (uids: string[]): string => {
  if (!uids) return '';

  let fillterText = '';
  for (let i = 0; i < uids.length; i += 1) {
    fillterText += ` AND NOT profile.uid: ${uids[i]}`;
  }
  return fillterText;
};

export const getDisplayProfile = (profile: Profile): DisplayProfile => {
  return {
    uid: profile.uid,
    userName: profile.userName,
    photoUrl: profile.photoUrl,
    learnLanguage: profile.learnLanguage,
    nativeLanguage: profile.nativeLanguage,
    ref: firebase.firestore().doc(`profiles/${profile.uid}`),
  };
};

export const getComments = (infoComments: InfoComment[]): Comment[] => {
  return infoComments.map(c => ({
    original: c.original,
    fix: c.fix,
    detail: c.detail,
  }));
};

export const updateUnread = async (
  objectID: string,
  uid: string,
  newUnreadCorrectionNum: number
): Promise<void> => {
  await await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      correctionStatus: 'done',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

  await await firebase
    .firestore()
    .doc(`users/${uid}`)
    .update({
      unreadCorrectionNum: newUnreadCorrectionNum,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
