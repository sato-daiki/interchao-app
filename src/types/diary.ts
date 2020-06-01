import { Language, CountryCode } from './profile';

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
  nationalityCode?: CountryCode;
}

export interface Diary {
  objectID?: string;
  premium: boolean;
  firstDiary: boolean;
  hidden: boolean;
  title: string;
  text: string;
  profile: DisplayProfile;
  diaryStatus: DiaryStatus;
  correction: DisplaCorrection | null;
  correction2?: DisplaCorrection | null;
  correction3?: DisplaCorrection | null;
  correctionStatus: CorrectionStatus;
  correctionStatus2?: CorrectionStatus;
  correctionStatus3?: CorrectionStatus;
  isReview: boolean;
  isReview2?: boolean;
  isReview3?: boolean;
  createdAt: Timestamp | firebase.firestore.FieldValue;
  updatedAt: Timestamp | firebase.firestore.FieldValue;
}
