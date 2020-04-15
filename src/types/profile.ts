import { firestore } from 'firebase';

export type Language = 'ja' | 'en';

export interface Profile {
  uid: string;
  name: string | null;
  userName: string;
  photoUrl: string | null;
  pro: boolean;
  learnLanguage: Language;
  nativeLanguage: Language;
  introduction: string | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
