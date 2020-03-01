import { firestore } from 'firebase';

export interface User {
  uid: string;
  premium: boolean;
  confirmDiary: boolean;
  confirmReview: boolean;
  email: string | null;
  points: number;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
