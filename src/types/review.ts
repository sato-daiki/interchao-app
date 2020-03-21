import { firestore } from 'firebase';

export interface Review {
  reviewer: string;
  reviewee: string;
  rating: number;
  comment: string;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
