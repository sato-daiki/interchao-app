import { Language } from './profile';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'correcting' | 'unread' | 'done';

// Correctionのうち一部を抜粋したもの
export interface DisplaCorrection {
  id: string;
  profile: DisplayProfile;
}

// Profileのうち一部を抜粋したもの
export interface DisplayProfile {
  uid: string;
  pro: boolean;
  userName: string;
  photoUrl: string | null;
  learnLanguage: Language;
  nativeLanguage: Language;
}

export interface Diary {
  objectID?: string;
  premium: boolean;
  isPublic: boolean;
  title: string;
  text: string;
  profile: DisplayProfile;
  diaryStatus: DiaryStatus;
  correction: DisplaCorrection | null;
  proCorrection: DisplaCorrection | null;
  correctionStatus: CorrectionStatus;
  correctionStatusPro: CorrectionStatus;
  isReview: boolean;
  isReviewPro: boolean;
  createdAt: Timestamp | firebase.firestore.FieldValue;
  updatedAt: Timestamp | firebase.firestore.FieldValue;
}
