import { firestore } from 'firebase';

export interface UserReview {
  uid: string;
  reviewNum: number;
  score: number;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
