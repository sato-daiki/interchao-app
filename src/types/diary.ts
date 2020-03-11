import { firestore } from 'firebase';
import { Language } from './profile';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'doing' | 'unread' | 'done';

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

// Profileのうち一部を抜粋したもの
export interface DisplayProfile {
  uid: string;
  name: string;
  userName: string;
  photoUrl: string;
  learnLanguage: Language;
  nativeLanguage: Language;
  nati: string;
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
  correction?: Correction;
  proCorrection?: Correction;
  correctionStatus: CorrectionStatus;
  correctionStatusPro: CorrectionStatus;
  isReview: boolean;
  isReviewPro: boolean;
  createdAt: Timestamp | firebase.firestore.FieldValue;
  updatedAt: Timestamp | firebase.firestore.FieldValue;
}
