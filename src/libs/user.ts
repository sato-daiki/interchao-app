import { User } from '../types';
import firebase from '../configs/firebase';

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
        confirmDiary,
        confirmReview,
        points,
        createdAt,
        updatedAt,
      } = data;

      return {
        uid,
        premium,
        confirmDiary,
        confirmReview,
        points,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
