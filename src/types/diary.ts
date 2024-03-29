import { Language, CountryCode } from './profile';
import { ThemeCategory, ThemeSubcategory } from './user';
import firebase from 'firebase';

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
  userName: string;
  photoUrl: string | null;
  learnLanguage: Language;
  nativeLanguage: Language;
  nationalityCode?: CountryCode | null;
}

export interface Diary {
  objectID?: string;
  firstDiary: boolean;
  hidden: boolean;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  fairCopyTitle?: string | null;
  fairCopyText?: string | null;
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
  voiceUrl?: string | null;
  publishedAt?: Timestamp | firebase.firestore.FieldValue;
  createdAt?: Timestamp | firebase.firestore.FieldValue;
  updatedAt: Timestamp | firebase.firestore.FieldValue;
}
