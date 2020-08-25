import moment from 'moment';
import 'moment/locale/ja';
import { Alert } from 'react-native';
import {
  CorrectionStatus,
  Language,
  Profile,
  DisplayProfile,
  Diary,
  CountryCode,
} from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';
import firebase from '../constants/firebase';
import I18n from './I18n';

interface Status {
  text: string;
  color: string;
}

/** algoliaから取得した時とfirestoreから取得したときは方が異なるで別で関数を用意する */
export const getAlgoliaDay = (timestamp: any): string => {
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp) {
    return '';
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp._seconds) {
    // reduxに登録された状態（日記投稿直後だとこちらに入る）
    return moment(timestamp).format('Y-M-D');
  }
  // eslint-disable-next-line no-underscore-dangle
  return moment.unix(timestamp._seconds).format('Y-M-D');
};

export const getDay = (timestamp: any): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp.toDate()).format('Y-M-D');
};

export const getAlgoliaDate = (timestamp: any): string => {
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp) {
    return '';
  }
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp._seconds) {
    return moment.unix(timestamp.seconds).format('Y-M-D HH:mm');
  }
  // eslint-disable-next-line no-underscore-dangle
  return moment.unix(timestamp._seconds).format('Y-M-D H:m');
};

// 日記一覧に出力するステータスの取得
export const getUserDiaryStatus = (
  correctionStatus: CorrectionStatus,
  correctionStatus2: CorrectionStatus | undefined,
  correctionStatus3: CorrectionStatus | undefined
): Status | null => {
  // 0添削の場合
  if (correctionStatus === 'yet') {
    return { text: I18n.t('userDiaryStatus.yet'), color: mainColor };
  }

  // 何か1つでも添削中の場合
  if (
    correctionStatus === 'correcting' ||
    correctionStatus2 === 'correcting' ||
    correctionStatus3 === 'correcting'
  ) {
    return { text: I18n.t('userDiaryStatus.correcting'), color: subTextColor };
  }

  // 添削が終わった数を取得
  let correctedNum = 0;
  if (correctionStatus === 'unread' || correctionStatus === 'done') {
    correctedNum += 1;
  }
  if (correctionStatus2 === 'unread' || correctionStatus2 === 'done') {
    correctedNum += 1;
  }
  if (correctionStatus3 === 'unread' || correctionStatus3 === 'done') {
    correctedNum += 1;
  }

  if (correctedNum > 0) {
    return {
      text: I18n.t('userDiaryStatus.done', { correctedNum }),
      color: subTextColor,
    };
  }
  // ここに入ることはない
  return null;
};

export const getMyDiaryStatus = (diary: Diary): Status | null => {
  const {
    diaryStatus,
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
    isReview,
    isReview2,
    isReview3,
  } = diary;

  if (diaryStatus === 'draft') return null;

  if (
    correctionStatus === 'unread' ||
    correctionStatus2 === 'unread' ||
    correctionStatus3 === 'unread'
  ) {
    return { text: I18n.t('myDiaryStatus.unread'), color: softRed };
  }

  if (
    (correctionStatus === 'done' && isReview === false) ||
    (correctionStatus2 === 'done' && isReview2 === false) ||
    (correctionStatus3 === 'done' && isReview3 === false)
  ) {
    return { text: I18n.t('myDiaryStatus.yetReview'), color: mainColor };
  }

  if (correctionStatus === 'yet' || correctionStatus === 'correcting') {
    return { text: I18n.t('myDiaryStatus.yet'), color: subTextColor };
  }

  return null;
};

export const getAllLanguage = (): Language[] => {
  return ['ja', 'en', 'zh', 'ko'];
};

export const getLanguageNum = (): number => {
  return getAllLanguage().length;
};

// すでに選択された言語、ネイティブ言語、勉強中の言語を除く
export const getTargetLanguages = (
  learnLanguage,
  nativeLanguage,
  spokenLanguages
): Language[] => {
  const allLanguage = getAllLanguage();
  return allLanguage.filter(item => {
    if (item === learnLanguage || item === nativeLanguage) return false;
    if (spokenLanguages) {
      for (let i = 0; i <= spokenLanguages.length; i += 1) {
        if (spokenLanguages[i] === item) return false;
      }
    }
    return true;
  });
};

export const getLanguage = (language: Language): string => {
  switch (language) {
    case 'ja':
      return I18n.t('language.ja');
    case 'en':
      return I18n.t('language.en');
    case 'zh':
      return I18n.t('language.zh');
    case 'ko':
      return I18n.t('language.ko');
    default:
      return '';
  }
};

export const getBasePoints = (language: Language): number => {
  switch (language) {
    case 'ja':
      return 300;
    case 'en':
      return 600;
    case 'zh':
      return 300;
    case 'ko':
      return 300;
    default:
      return 600;
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

export const getFillterLanguages = (
  nativeLanguage: Language,
  spokenLanguages: Language[] | null | undefined
): string => {
  let fillterText = `(profile.learnLanguage: ${nativeLanguage}`;
  if (spokenLanguages) {
    for (let i = 0; i < spokenLanguages.length; i += 1) {
      fillterText += ` OR profile.learnLanguage: ${spokenLanguages[i]} `;
    }
  }
  fillterText += ')';
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
    nationalityCode: profile.nationalityCode || null,
  };
};

export const updateUnread = async (
  objectID: string,
  data: any
): Promise<void> => {
  await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getUsePoints = (
  length: number,
  learnLanguage: Language
): number => {
  const basePoints = getBasePoints(learnLanguage);
  return Math.ceil(length / basePoints) * 10;
};

export const checkBeforePost = (
  title: string,
  text: string,
  points: number,
  learnLanguage: Language
): { result: boolean; errorMessage: string } => {
  if (!title) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyTitile') };
  }
  if (!text) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyText') };
  }
  const usePoint = getUsePoints(text.length, learnLanguage);
  if (usePoint > points) {
    return {
      result: false,
      errorMessage: I18n.t('errorMessage.lackPointsText', {
        textLength: text.length,
        usePoint,
      }),
    };
  }

  return {
    result: true,
    errorMessage: '',
  };
};

/**
 * 途中で日記をやめた時の処理
 */
type Data =
  | {
      correctionStatus: CorrectionStatus;
    }
  | {
      correctionStatus2: CorrectionStatus;
    }
  | {
      correctionStatus3: CorrectionStatus;
    };

export const updateYet = async (
  objectID: string,
  uid: string,
  data: any
): Promise<void> => {
  const batch = firebase.firestore().batch();
  batch.update(firebase.firestore().doc(`diaries/${objectID}`), {
    ...data,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  batch.delete(firebase.firestore().doc(`correctings/${objectID}`));

  batch.update(firebase.firestore().doc(`users/${uid}`), {
    correctingObjectID: null,
    correctingCorrectedNum: null,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  batch.commit();
};

export const checkSelectLanguage = (
  nationalityCode: CountryCode | null | undefined,
  learnLanguage: Language,
  nativeLanguage: Language,
  spokenLanguages: Language[]
): boolean => {
  if (!nationalityCode) {
    Alert.alert('', I18n.t('selectLanguage.nationalityCodeAlert'));
    return false;
  }

  if (learnLanguage === nativeLanguage) {
    Alert.alert('', I18n.t('selectLanguage.sameLanguageAlert'));
    return false;
  }

  if (spokenLanguages) {
    for (let i = 0; i < spokenLanguages.length; i += 1) {
      if (spokenLanguages[i] === learnLanguage) {
        Alert.alert('', I18n.t('selectLanguage.sameSpokenAlert'));
        return false;
      }

      if (spokenLanguages[i] === nativeLanguage) {
        Alert.alert('', I18n.t('selectLanguage.sameSpokenAlert'));
        return false;
      }
    }
  }
  return true;
};
