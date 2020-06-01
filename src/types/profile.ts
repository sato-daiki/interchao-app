import { firestore } from 'firebase';
import { CountryCode as CountryCodeOrigin } from 'react-native-country-picker-modal/lib/types';

export type CountryCode = CountryCodeOrigin;
export type Language = 'ja' | 'en';

export interface Profile {
  uid: string;
  name: string | null;
  userName: string;
  photoUrl: string | null;
  pro: boolean;
  learnLanguage: Language;
  nativeLanguage: Language;
  nationalityCode?: CountryCode;
  introduction: string | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
