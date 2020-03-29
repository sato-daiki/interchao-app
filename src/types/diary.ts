import { Language } from './profile';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'doing' | 'unread' | 'done';

export interface Comment {
  original: string;
  fix: string;
  detail: string;
}

export interface Correction {
  profile: DisplayProfile;
  comments: Comment[];
  summary: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Profileのうち一部を抜粋したもの
export interface DisplayProfile {
  uid: string;
  userName: string;
  photoUrl: string;
  learnLanguage: Language;
  nativeLanguage: Language;
  ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export interface Diary {
  objectID?: string;
  premium: boolean;
  isPublic: boolean;
  title: string;
  text: string;
  profile: DisplayProfile;
  diaryStatus: DiaryStatus;
  correction: Correction | null;
  proCorrection: Correction | null;
  correctionStatus: CorrectionStatus;
  correctionStatusPro: CorrectionStatus;
  isReview: boolean;
  isReviewPro: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
