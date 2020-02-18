import moment from 'moment';
import 'moment/locale/ja';

import { DiaryStatus, CorrectionStatus } from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';

interface Status {
  text: string;
  color: string;
}

type ScreenName = 'my' | 'draft' | 'teach';

export const getPostDay = (createdAt: firebase.firestore.Timestamp): string => {
  if (!createdAt) {
    return '';
  }
  const target = moment(createdAt.toDate());
  return target.format('Y-M-D');
};
// 日記一覧に出力するステータスの取得

const getTeachDiaryStatus = (
  correctionStatus: CorrectionStatus
): Result | null => {
  if (correctionStatus === 'yet') {
    return { text: '未添削', color: mainColor };
  }

  if (correctionStatus === 'doing') {
    return { text: '添削中', color: softRed };
  }

  return null;
};

const getMyDiaryStatus = (
  diaryStatus: DiaryStatus,
  correctionStatus: CorrectionStatus,
  isReview: boolean
): Result | null => {
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

export const getDiaryStatus = (
  screenName: ScreenName,
  diaryStatus: DiaryStatus,
  correctionStatus: CorrectionStatus,
  isReview: boolean
): Status | null => {
  if (screenName === 'my') {
    return getMyDiaryStatus(diaryStatus, correctionStatus, isReview);
  }
  if (screenName === 'teach') {
    return getTeachDiaryStatus(correctionStatus);
  }

  if (screenName === 'draft') {
    if (diaryStatus === 'draft') {
      return { text: '下書き', color: subTextColor };
    }
    // ここに入るのはおかしい
    return null;
  }

  // ここに入るのはおかしい
  return null;
};
