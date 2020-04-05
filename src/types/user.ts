import { firestore } from 'firebase';

export interface User {
  uid: string;
  premium: boolean;
  confirmCorrection: boolean;
  tutorialPostDiary: boolean;
  tutorialTeachDiaryList: boolean;
  tutorialCorrectiong: boolean;
  points: number;
  expoPushToken: string | null;
  unreadCorrectionNum: number;
  notificationCorrection: boolean;
  notificationReview: boolean;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
