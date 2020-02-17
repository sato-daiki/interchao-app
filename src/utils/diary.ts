import { DiaryStatus, CorrectionStatus } from '../types';
import { softRed, subTextColor, mainColor } from '../styles/Common';

interface Result {
  text: string;
  color: string;
}

export const getPostDay = (createdAt: firebase.firestore.Timestamp): string => {
  const date = createdAt.toDate();
  date.to;
};
// 日記一覧に出力するステータスの取得
export const getDiaryStatus = (
  diaryStatus: DiaryStatus,
  correctionStatus: CorrectionStatus,
  isReview: boolean
): Result | null => {
  if (diaryStatus === 'draft') {
    return { text: '下書き', color: subTextColor };
  }
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
