import { firestore } from 'firebase';

export interface User {
  uid: string;
  premium: boolean;
  confirmDiary: boolean;
  confirmReview: boolean;
  points: number;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
