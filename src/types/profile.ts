import { firestore } from 'firebase';

export type Language = 'ja' | 'en';

export interface Profile {
  uid: string;
  name: string;
  userName: string;
  photoUrl: string;
  pro: boolean;
  learnLanguage: Language;
  nativeLanguage: Language;
  introduction: string;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
