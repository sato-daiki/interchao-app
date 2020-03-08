import moment from 'moment';
import 'moment/locale/ja';

import { DiaryStatus, CorrectionStatus, Timestamp } from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';

interface Status {
  text: string;
  color: string;
}

export const getPostDay = (
  timestamp: Timestamp | firebase.firestore.FieldValue
): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp).format('Y-M-D');
};

// 日記一覧に出力するステータスの取得
export const getTeachDiaryStatus = (
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
