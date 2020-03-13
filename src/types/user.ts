import { firestore } from 'firebase';

export interface User {
  uid: string;
  premium: boolean;
  confirmCorrection: boolean;
  points: number;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
