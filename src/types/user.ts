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

export interface RemindeDay {
  day: number; // Sunday - Saturday : 0 - 6
  timeStart: Date;
  timeEnd: Date;
}

export type ReminderType = 'custom' | 'fix';

export interface Reminder {
  reminderType: ReminderType;
  notificationStart: boolean;
  notificationEnd: boolean;
  customTimeInfos: CustomTimeInfo[] | null;
  fixDays: RemindeDay[] | null;
  fixTimeInfo: FixTimeInfo;
}

export interface User {
  uid: string;
  diaryPosted: boolean;
  onboarding?: boolean;
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
  reminder?: Reminder;
  runningDays?: number;
  runningWeeks?: number;
  lastDiaryPostedAt?: firestore.Timestamp | null;
  lastModalAppSuggestionAt?: firestore.Timestamp | null;
  lastModalNotficationSettingAt?: firestore.Timestamp | null;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
}
