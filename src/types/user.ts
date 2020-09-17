import { firestore } from 'firebase';

export interface User {
  uid: string;
  diaryPosted: boolean;
  tutorialPostDiary: boolean;
  tutorialTeachDiaryList: boolean;
  tutorialCorrectiong: boolean;
  points: number;
  expoPushToken: string | null;
  correctingObjectID: string | null;
  correctingCorrectedNum: number | null;
  notificationCorrection: boolean;
  notificationReview: boolean;
  lastModalAppSuggestionAt?: firestore.Timestamp | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
