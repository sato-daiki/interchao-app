import { firestore } from 'firebase';
import { CountryCode as CountryCodeOrigin } from 'react-native-country-picker-modal/lib/types';

export type CountryCode = CountryCodeOrigin;
export type Language = 'ja' | 'en' | 'zh' | 'ko';

export interface Profile {
  uid: string;
  name: string | null;
  userName: string;
  photoUrl: string | null;
  learnLanguage: Language;
  nativeLanguage: Language;
  spokenLanguages?: Language[] | null;
  nationalityCode?: CountryCode | null;
  introduction: string | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
