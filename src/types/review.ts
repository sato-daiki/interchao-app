import { firestore } from 'firebase';

interface Reviewer {
  uid: string;
  userName: string;
  photoUrl: string | null;
}

export interface Review {
  reviewer: Reviewer;
  revieweeUid: string;
  rating: number;
  comment: string;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
