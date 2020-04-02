import { firestore } from 'firebase';

export interface User {
  uid: string;
  premium: boolean;
  confirmCorrection: boolean;
  points: number;
  expoPushToken: string | null;
  unreadCorrection: number;
  notificationCorrection: boolean;
  notificationReview: boolean;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
