import { Language, CountryCode } from './index';

export interface Reviewer {
  uid: string;
  userName: string;
  photoUrl: string | null;
  nativeLanguage: Language;
  nationalityCode?: CountryCode | null;
}

export interface Review {
  reviewer: Reviewer;
  revieweeUid: string;
  objectID: string;
  rating: number;
  comment: string;
  createdAt: firebase.firestore.FieldValue;
}
