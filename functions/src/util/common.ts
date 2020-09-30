import * as dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { IncomingWebhook } from '@slack/client';
import { Diary, CorrectionStatus } from '../../../src/types/diary';

export const getIsProduction = (): boolean => {
  dotenv.config();

  let adminConfig;
  if (process.env.FIREBASE_CONFIG) {
    adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  }

  if (adminConfig.projectId === 'white-zebra-5096f') {
    return true;
  }
  return false;
};

export const getIndex = () => {
  dotenv.config();

  const ALGOLIA_ID = process.env.ALGOLIA_APP_ID!;
  const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_API_KEY!;

  let adminConfig;
  if (process.env.FIREBASE_CONFIG) {
    adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  }
  const ALGOLIA_INDEX_NAME =
    adminConfig.projectId === 'white-zebra-5096f'
      ? 'prod_diaries'
      : 'dev_diaries';
  console.log('ALGOLIA_INDEX_NAME', ALGOLIA_INDEX_NAME);
  console.log('adminConfig.projectId', adminConfig.projectId);

  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
  return client.initIndex(ALGOLIA_INDEX_NAME);
};

/**
 * getReduceData - 必要なデータのみを抽出する（全て持つとalgoliaでサイズオーバーエラーになるため）。
 * - data:  firebaseから取得したdiary
 */
export const getReduceDiaryData = (
  data: FirebaseFirestore.DocumentData,
  isNew: boolean
): Diary => {
  const {
    firstDiary,
    hidden,
    title,
    text,
    fairCopyTitle,
    fairCopyText,
    profile,
    diaryStatus,
    correction,
    correction2,
    correction3,
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
    isReview,
    isReview2,
    isReview3,
    voiceUrl,
    updatedAt,
    createdAt,
  } = data;
  const createdInfo = isNew ? { createdAt } : undefined;
  const {
    uid,
    userName,
    photoUrl,
    nativeLanguage,
    learnLanguage,
    nationalityCode,
  } = profile;

  return {
    firstDiary,
    hidden,
    title,
    text,
    fairCopyTitle,
    fairCopyText,
    profile: {
      uid,
      userName,
      photoUrl,
      learnLanguage,
      nativeLanguage,
      nationalityCode,
    },
    diaryStatus,
    correction: correction
      ? {
          id: correction.id,
          profile: {
            uid: correction.profile.uid,
            userName: correction.profile.userName,
            photoUrl: correction.profile.photoUrl,
            learnLanguage: correction.profile.learnLanguage,
            nativeLanguage: correction.profile.nativeLanguage,
            nationalityCode: correction.profile.nationalityCode,
          },
        }
      : null,
    correction2: correction2
      ? {
          id: correction2.id,
          profile: {
            uid: correction2.profile.uid,
            userName: correction2.profile.userName,
            photoUrl: correction2.profile.photoUrl,
            learnLanguage: correction2.profile.learnLanguage,
            nativeLanguage: correction2.profile.nativeLanguage,
            nationalityCode: correction2.profile.nationalityCode,
          },
        }
      : null,
    correction3: correction3
      ? {
          id: correction3.id,
          profile: {
            uid: correction3.profile.uid,
            userName: correction3.profile.userName,
            photoUrl: correction3.profile.photoUrl,
            learnLanguage: correction3.profile.learnLanguage,
            nativeLanguage: correction3.profile.nativeLanguage,
            nationalityCode: correction3.profile.nationalityCode,
          },
        }
      : null,
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
    isReview,
    isReview2,
    isReview3,
    voiceUrl,
    updatedAt,
    ...createdInfo,
  };
};

export const sendMessage = async (message: string): Promise<void> => {
  const url =
    'https://hooks.slack.com/services/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';
  const webhook = new IncomingWebhook(url);
  await webhook.send(message);
};

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

export const getDataCorrectionStatus = (
  correctingCorrectedNum: number | null,
  correctionStatus: CorrectionStatus
): Data | undefined => {
  let data;
  if (correctingCorrectedNum === 1) {
    data = { correctionStatus };
  } else if (correctingCorrectedNum === 2) {
    data = { correctionStatus2: correctionStatus };
  } else if (correctingCorrectedNum === 3) {
    data = { correctionStatus3: correctionStatus };
  }
  return data;
};
