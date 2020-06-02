import moment from 'moment';
import 'moment/locale/ja';
import { Alert } from 'react-native';
import {
  CorrectionStatus,
  Language,
  Profile,
  DisplayProfile,
  Comment,
  Diary,
  User,
} from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';
import firebase from '../constants/firebase';
import I18n from './I18n';
import Algolia from './Algolia';
import { track, events } from './Analytics';

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

export const getBasePoints = (language: Language): number => {
  switch (language) {
    case 'ja':
      return 300;
    case 'en':
      return 600;
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

export const getDisplayProfile = (profile: Profile): DisplayProfile => {
  return {
    uid: profile.uid,
    pro: profile.pro,
    userName: profile.userName,
    photoUrl: profile.photoUrl,
    learnLanguage: profile.learnLanguage,
    nativeLanguage: profile.nativeLanguage,
    nationalityCode: profile.nationalityCode,
  };
};

export const getComments = (infoComments: any): Comment[] => {
  return infoComments.map(c => ({
    original: c.original,
    fix: c.fix,
    detail: c.detail,
  }));
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
  learnLanguage: Language,
  nativeLanguage: Language
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
        nativeLanguage: getlanguage(nativeLanguage),
      })
    );
    return false;
  }

  return true;
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

// 添削チェックしてOK次へすすむ
export const onStatusCheck = async (
  isLoading: boolean,
  user: User,
  teachDiary: Diary | undefined,
  goToCorrecting: () => void,
  setIsModalCorrection: Function,
  setIsLoading: Function,
  setRedux: (userInfo, diaryInfo) => void
): Promise<void> => {
  if (!teachDiary || !teachDiary.objectID) return;
  if (isLoading) return;
  setIsLoading(true);

  // 他の人が添削を開始していないかチェックする
  const index = await Algolia.getDiaryIndex(true);
  await Algolia.setSettings(index);
  const res = await index.search('', {
    filters: `objectID: ${teachDiary.objectID} AND (correctionStatus: correcting OR correctionStatus2: correcting OR correctionStatus3: correcting)`,
    page: 0,
    hitsPerPage: 1,
  });

  if (res.nbHits > 0) {
    Alert.alert(
      I18n.t('common.error'),
      I18n.t('errorMessage.correctionAlready')
    );
    setIsLoading(false);
    return;
  }
  const res2 = await index.search('', {
    filters: `objectID: ${teachDiary.objectID} AND (correctionStatus: yet OR correctionStatus2: yet OR correctionStatus3: yet)`,
    page: 0,
    hitsPerPage: 1,
  });

  if (res2.nbHits !== 1) {
    Alert.alert(
      I18n.t('common.error'),
      I18n.t('errorMessage.correctionAlready')
    );
    setIsLoading(false);
    return;
  }

  const diary = res2.hits[0] as Diary;
  const data = {
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  } as any;
  let correctingCorrectedNum: number;
  if (diary.correctionStatus === 'yet') {
    data.correctionStatus = 'correcting';
    correctingCorrectedNum = 1;
  } else if (diary.correctionStatus2 === 'yet') {
    data.correctionStatus2 = 'correcting';
    correctingCorrectedNum = 2;
  } else if (diary.correctionStatus3 === 'yet') {
    data.correctionStatus3 = 'correcting';
    correctingCorrectedNum = 3;
  } else {
    return;
  }
  const batch = firebase.firestore().batch();

  //  添削中のobjectIDを更新する
  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  batch.update(userRef, {
    correctingObjectID: teachDiary.objectID,
    correctingCorrectedNum,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  //  添削中一覧に追加する
  const correctingRef = firebase
    .firestore()
    .doc(`correctings/${teachDiary.objectID}`);
  batch.set(correctingRef, {
    uid: user.uid,
    correctedNum: correctingCorrectedNum,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  //  日記のステータスを添削中に変更する
  const diaryRef = firebase.firestore().doc(`diaries/${teachDiary.objectID}`);

  batch.update(diaryRef, data);
  batch.commit();
  const userInfo = {
    ...user,
    correctingObjectID: teachDiary.objectID,
    correctingCorrectedNum,
  };
  const diaryInfo = {
    ...teachDiary,
    ...data,
  };
  setRedux(userInfo, diaryInfo);
  track(events.CREATED_CORRECTING);
  setIsModalCorrection(false);
  setIsLoading(false);
  goToCorrecting();
};
