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
        premium,
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
        lastModalAppSuggestionAt,
        createdAt,
        updatedAt,
      } = data;

      return {
        uid,
        premium,
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
        lastModalAppSuggestionAt,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
