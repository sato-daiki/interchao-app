import { Language } from './profile';

export interface Inquiry {
  uid: string;
  userName: string;
  nativeLanguage: Language;
  email: string;
  message: string;
  createdAt: firebase.firestore.FieldValue;
}
