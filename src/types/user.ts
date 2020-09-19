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
  runningDays?: number;
  runningWeeks?: number;
  lastDiaryPostedAt?: firestore.Timestamp | null;
  lastModalAppSuggestionAt?: firestore.Timestamp | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
