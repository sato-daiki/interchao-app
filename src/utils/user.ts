import { User } from '../types';
import firebase from '../constants/firebase';

// ユーザ情報取得
export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const doc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    const data = doc.data();
    if (data) {
      const {
        diaryPosted,
        tutorialPostDiary,
        tutorialTeachDiaryList,
        tutorialCorrectiong,
        points,
        expoPushToken,
        correctingObjectID,
        correctingCorrectedNum,
        notificationCorrection,
        notificationReview,
        // notificationReminderNextDay,
        // notificationReminderThreeDays,
        // notificationReminderOneWeek,
        // notificationReminderOneMonth,
        // notificationReminderThreeMonths,
        mailCorrection,
        mailOperation,
        // mailReminderNextDay,
        // mailReminderThreeDays,
        // mailReminderOneWeek,
        // mailReminderOneMonth,
        // mailReminderThreeMonths,
        appReviewState,
        runningDays,
        runningWeeks,
        lastDiaryPostedAt,
        lastModalAppSuggestionAt,
        lastModalNotficationSettingAt,
        createdAt,
        updatedAt,
      } = data;

      return {
        uid,
        diaryPosted,
        tutorialPostDiary,
        tutorialTeachDiaryList,
        tutorialCorrectiong,
        points,
        expoPushToken,
        correctingObjectID,
        correctingCorrectedNum,
        notificationCorrection,
        notificationReview,
        // notificationReminderNextDay,
        // notificationReminderThreeDays,
        // notificationReminderOneWeek,
        // notificationReminderOneMonth,
        // notificationReminderThreeMonths,
        mailCorrection,
        mailOperation,
        // mailReminderNextDay,
        // mailReminderThreeDays,
        // mailReminderOneWeek,
        // mailReminderOneMonth,
        // mailReminderThreeMonths,
        appReviewState,
        runningDays,
        runningWeeks,
        lastDiaryPostedAt,
        lastModalAppSuggestionAt,
        lastModalNotficationSettingAt,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
