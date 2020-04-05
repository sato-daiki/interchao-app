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
        confirmCorrection,
        tutorialPostDiary,
        tutorialTeachDiaryList,
        tutorialCorrectiong,
        points,
        expoPushToken,
        correctingObjectID,
        unreadCorrectionNum,
        notificationCorrection,
        notificationReview,
        createdAt,
        updatedAt,
      } = data;

      return {
        uid,
        premium,
        confirmCorrection,
        tutorialPostDiary,
        tutorialTeachDiaryList,
        tutorialCorrectiong,
        points,
        expoPushToken,
        correctingObjectID,
        unreadCorrectionNum,
        notificationCorrection,
        notificationReview,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
