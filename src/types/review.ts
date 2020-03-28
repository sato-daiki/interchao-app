import { firestore } from 'firebase';

export interface Review {
  reviewerUid: string;
  revieweeUid: string;
  rating: number;
  comment: string;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
