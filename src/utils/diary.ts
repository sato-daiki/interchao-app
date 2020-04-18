import moment from 'moment';
import 'moment/locale/ja';
import { Alert } from 'react-native';
import {
  DiaryStatus,
  CorrectionStatus,
  Timestamp,
  Language,
  Profile,
  DisplayProfile,
  Comment,
  InfoComment,
} from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';
import firebase from '../constants/firebase';
import I18n from './I18n';

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
    return { text: I18n.t('diaryStatus.yet'), color: mainColor };
  }

  if (correctionStatus === 'correcting') {
    return { text: I18n.t('diaryStatus.correcting'), color: subTextColor };
  }

  return null;
};

export const getMyDiaryStatus = (
  diaryStatus: DiaryStatus,
  correctionStatus: CorrectionStatus,
  isReview: boolean
): Status | null => {
  if (diaryStatus === 'publish') {
    if (correctionStatus === 'yet' || correctionStatus === 'correcting') {
      return { text: I18n.t('diaryStatus.yet'), color: subTextColor };
    }
    if (correctionStatus === 'unread') {
      return { text: I18n.t('diaryStatus.unread'), color: softRed };
    }
    if (correctionStatus === 'done') {
      if (!isReview) {
        return { text: I18n.t('diaryStatus.yetReview'), color: mainColor };
      }
    }
  }
  return null;
};

export const getlanguage = (language: Language): string => {
  switch (language) {
    case 'ja':
      return I18n.t('language.ja');
    case 'en':
      return I18n.t('language.en');
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
    pro: profile.pro,
    userName: profile.userName,
    photoUrl: profile.photoUrl,
    learnLanguage: profile.learnLanguage,
    nativeLanguage: profile.nativeLanguage,
  };
};

export const getComments = (infoComments: InfoComment[]): Comment[] => {
  return infoComments.map(c => ({
    original: c.original,
    fix: c.fix,
    detail: c.detail,
  }));
};

export const updateUnread = async (objectID: string): Promise<void> => {
  await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      correctionStatus: 'done',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getUsePoints = (
  length: number,
  learnLanguage: Language
): number => {
  if (learnLanguage === 'en') {
    return Math.ceil(length / 600) * 10;
  }
  return Math.ceil(length / 200) * 10;
};

export const checkBeforePost = (
  title: string,
  text: string,
  points: number,
  learnLanguage: Language
): boolean => {
  if (!title) {
    Alert.alert('', I18n.t('errorMessage.emptyTitile'));
    return false;
  }
  if (!text) {
    Alert.alert('', I18n.t('errorMessage.emptyText'));
    return false;
  }
  const usePoint = getUsePoints(text.length, learnLanguage);
  if (usePoint > points) {
    Alert.alert(
      I18n.t('errorMessage.lackPointsTitle'),
      I18n.t('errorMessage.lackPointsText', {
        textLength: text.length,
        usePoint,
      })
    );
    return false;
  }

  return true;
};

/**
 * 途中で日記をやめた時の処理
 */
export const updateYet = async (
  objectID: string,
  uid: string
): Promise<void> => {
  await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      correctionStatus: 'yet',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

  await firebase
    .firestore()
    .doc(`correctings/${objectID}`)
    .delete();

  await firebase
    .firestore()
    .doc(`users/${uid}`)
    .update({
      correctingObjectID: null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
