import moment from 'moment';
import 'moment/locale/ja';
import { firestore } from 'firebase';
import firebase from '@/constants/firebase';
import {
  CorrectionStatus,
  Language,
  Profile,
  DisplayProfile,
  Diary,
  CountryCode,
} from '@/types';
import { softRed, subTextColor, mainColor, green } from '@/styles/Common';

import { MarkedDates } from '@/components/organisms/MyDiaryList';
import I18n from './I18n';
import { DataCorrectionStatus } from './correcting';
import { getDateToStrDay, getLastMonday, getThisMonday } from './common';

interface Status {
  text: string;
  color: string;
}

/** algoliaから取得した時とfirestoreから取得したときは方が異なるで別で関数を用意する */
export const getAlgoliaDay = (timestamp: any, format = 'Y-M-D'): string => {
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp) {
    return '';
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp._seconds) {
    // reduxに登録された状態（日記投稿直後だとこちらに入る）
    return moment(timestamp).format(format);
  }
  // eslint-disable-next-line no-underscore-dangle
  return moment.unix(timestamp._seconds).format(format);
};

export const getDay = (timestamp: any): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp.toDate()).format('Y-M-D');
};

export const getAlgoliaDate = (timestamp: any): string => {
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

export const MY_STATUS = {
  unread: { text: I18n.t('myDiaryStatus.unread'), color: softRed },
  draft: { text: I18n.t('draftListItem.draft'), color: subTextColor },
  yet: { text: I18n.t('myDiaryStatus.yet'), color: mainColor },
  done: { text: I18n.t('myDiaryStatus.done'), color: green },
  posted: { text: I18n.t('myDiaryStatus.posted'), color: green },
};

export const getMyDiaryStatus = (diary: Diary): Status | null => {
  const {
    diaryStatus,
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
  } = diary;

  if (diaryStatus === 'draft') return MY_STATUS.draft;

  if (
    correctionStatus === 'unread' ||
    correctionStatus2 === 'unread' ||
    correctionStatus3 === 'unread'
  ) {
    return MY_STATUS.unread;
  }

  if (correctionStatus === 'yet' || correctionStatus === 'correcting') {
    return MY_STATUS.yet;
  }

  return MY_STATUS.done;
};

export const allLanguage: Language[] = ['ja', 'en', 'zh', 'ko'];

export const getLanguageNum = (): number => {
  return allLanguage.length;
};

// すでに選択された言語、ネイティブ言語、勉強中の言語を除く
export const getTargetLanguages = (
  learnLanguage,
  nativeLanguage,
  spokenLanguages
): Language[] => {
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
    userName: profile.userName,
    photoUrl: profile.photoUrl,
    learnLanguage: profile.learnLanguage,
    nativeLanguage: profile.nativeLanguage,
    nationalityCode: profile.nationalityCode || null,
  };
};

export const updateUnread = async (
  objectID: string,
  data: DataCorrectionStatus | null
): Promise<void> => {
  await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getMaxPostText = (learnLanguage: Language): number => {
  const basePoints = getBasePoints(learnLanguage);
  return basePoints * 4;
};

export const getUsePoints = (
  length: number,
  learnLanguage: Language
): number => {
  const basePoints = getBasePoints(learnLanguage);
  return Math.ceil(length / basePoints) * 10;
};

export const getRunningDays = (
  runningDays: number | undefined,
  lastDiaryPostedAt: firestore.Timestamp | null | undefined
): number => {
  // 初投稿の場合
  if (!lastDiaryPostedAt || !runningDays) return 1;

  const strTargetDay = getDateToStrDay(lastDiaryPostedAt.toDate());

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const strYesterday = getDateToStrDay(yesterday);

  if (strTargetDay === strYesterday) {
    // 昨日投稿していた場合
    return runningDays + 1;
  }

  const strToday = getDateToStrDay(new Date());

  if (strTargetDay === strToday) {
    // 今日投稿している場合
    return runningDays;
  }

  // 昨日より前に投稿していた場合
  return 1;
};

export const getRunningWeeks = (
  runningWeeks: number | undefined,
  lastDiaryPostedAt: firestore.Timestamp | null | undefined
): number => {
  // 初回の場合
  if (!lastDiaryPostedAt || !runningWeeks) return 1;
  const strTargetThisMonday = getThisMonday(lastDiaryPostedAt.toDate());

  const strLastMonday = getLastMonday(new Date());

  if (strTargetThisMonday === strLastMonday) {
    // 最終投稿が1週間前の時
    return runningWeeks + 1;
  }

  const strThisMonday = getThisMonday(new Date());
  if (strTargetThisMonday === strThisMonday) {
    // 今週投稿している場合
    return runningWeeks;
  }

  // 先週の月曜日以降投稿していない場合
  return 1;
};

export const getPublishMessage = (
  beforeDays: number | null | undefined,
  beforeWeeks: number | null | undefined,
  afterDays: number,
  afterWeeks: number
): string | null => {
  if (beforeDays === 0) {
    // 初回（0の場合もこっちに入る）
    return I18n.t('modalAlertPublish.first');
  }
  if (!beforeDays || !beforeWeeks) return I18n.t('modalAlertPublish.good');

  if (beforeDays + 1 === afterDays) {
    // 日が連続の場合
    return I18n.t('modalAlertPublish.runningDays', { runningDays: afterDays });
  }

  if (beforeWeeks + 1 === afterWeeks) {
    // 週が連続の場合
    return I18n.t('modalAlertPublish.runningWeeks', {
      runningWeeks: afterWeeks,
    });
  }
  return I18n.t('modalAlertPublish.good');
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
  if (text.length > getMaxPostText(learnLanguage)) {
    return {
      result: false,
      errorMessage: I18n.t('errorMessage.exceedingCharacter', {
        textLength: getMaxPostText(learnLanguage),
      }),
    };
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
  data: DataCorrectionStatus | null
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
): { result: boolean; errorMessage: string } => {
  if (!nationalityCode) {
    return {
      result: false,
      errorMessage: I18n.t('selectLanguage.nationalityCodeAlert'),
    };
  }

  if (learnLanguage === nativeLanguage) {
    return {
      result: false,
      errorMessage: I18n.t('selectLanguage.sameLanguageAlert'),
    };
  }

  if (spokenLanguages) {
    for (let i = 0; i < spokenLanguages.length; i += 1) {
      if (spokenLanguages[i] === learnLanguage) {
        return {
          result: false,
          errorMessage: I18n.t('selectLanguage.sameSpokenAlert'),
        };
      }

      if (spokenLanguages[i] === nativeLanguage) {
        return {
          result: false,
          errorMessage: I18n.t('selectLanguage.sameSpokenAlert'),
        };
      }
    }
  }
  return {
    result: true,
    errorMessage: I18n.t('selectLanguage.sameSpokenAlert'),
  };
};

// 投稿済みの時はpublishedAt、下書きの時または以前verの時はcreatedAt
export const getMarkedDates = (newDiaries: Diary[]): MarkedDates =>
  newDiaries.reduce((prev, d) => {
    if (!d.objectID) return prev;
    const myDiaryStatus = getMyDiaryStatus(d);
    const date = getAlgoliaDay(d.publishedAt || d.createdAt, 'YYYY-MM-DD');
    const params = {
      key: d.objectID,
      selectedDotColor: '#fff',
      color: myDiaryStatus?.color,
    };

    return {
      ...prev,
      [date]: {
        dots: prev[date] ? [...prev[date].dots, params] : [params],
      },
    };
  }, {});
