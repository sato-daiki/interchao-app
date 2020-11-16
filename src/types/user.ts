import { firestore } from 'firebase';

export type ThemeCategory = 'first';
export type ThemeSubcategory =
  | 'selfIntroduction'
  | 'hobby'
  | 'job'
  | 'study'
  | 'dream'
  | 'trip'
  | 'reborn';

export interface ThemeDiary {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  objectID: string;
  updatedAt: firebase.firestore.FieldValue;
  createdAt: firebase.firestore.FieldValue;
}

export type AppReviewState = 'yet' | 'never' | 'done';

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
  // notificationReminderNextDay?: boolean;
  // notificationReminderThreeDays?: boolean;
  // notificationReminderOneWeek?: boolean;
  // notificationReminderOneMonth?: boolean;
  // notificationReminderThreeMonths?: boolean;
  mailCorrection?: boolean;
  mailOperation?: boolean;
  // mailReminderNextDay?: boolean;
  // mailReminderThreeDays?: boolean;
  // mailReminderOneWeek?: boolean;
  // mailReminderOneMonth?: boolean;
  // mailReminderThreeMonths?: boolean;
  themeDiaries?: ThemeDiary[] | null;
  appReviewState?: AppReviewState;
  runningDays?: number;
  runningWeeks?: number;
  lastDiaryPostedAt?: firestore.Timestamp | null;
  lastModalAppSuggestionAt?: firestore.Timestamp | null;
  lastModalNotficationSettingAt?: firestore.Timestamp | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
