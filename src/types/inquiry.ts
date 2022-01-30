import { Language } from './profile';
import firebase from 'firebase';

export interface Inquiry {
  uid: string;
  userName: string;
  nativeLanguage: Language;
  email: string;
  message: string;
  createdAt: firebase.firestore.FieldValue;
}
