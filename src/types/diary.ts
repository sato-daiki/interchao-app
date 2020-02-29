import { firestore } from 'firebase';

export type DiaryStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'doing' | 'unread' | 'done';

export interface DisplayProfile {
  name: string;
  photoUrl: string;
  ref: string;
}

export interface Commment {
  startNum: number;
  sentence: string;
  detail: string;
}

export interface Correction {
  profile: DisplayProfile;
  commments: Commment[];
  summary: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export interface Diary {
  id: string;
  profile: DisplayProfile;
  correction: Correction;
  proCorrection: Correction;
  title: string;
  text: string;
  diaryStatus: DiaryStatus;
  correctionStatus: CorrectionStatus;
  isReview: boolean;
  isPro: boolean;
  diaryStatusPro: DiaryStatus;
  correctionStatusPro: CorrectionStatus;
  isReviewPro: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}
