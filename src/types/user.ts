import { firestore } from 'firebase';

export interface User {
  paid: boolean;
  confirmDiary: boolean;
  confirmReview: false;
  email: string;
  points: number;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}
