import firebase from '@/constants/firebase';
import { User } from '@/types';

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
      return {
        uid,
        ...data,
      } as User;
    }
  } catch (e) {
    return null;
  }
  return null;
};
