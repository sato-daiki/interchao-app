import { Profile } from '../types';
import firebase from '../constants/firebase';

// ユーザ情報取得
export const getProfile = async (uid: string): Promise<Profile | null> => {
  try {
    const doc = await firebase
      .firestore()
      .collection('profiles')
      .doc(uid)
      .get();
    const data = doc.data();
    if (data) {
      const {
        name,
        userName,
        photoUrl,
        pro,
        learnLanguage,
        nativeLanguage,
        introduction,
        createdAt,
        updatedAt,
      } = data;

      return {
        uid,
        name,
        userName,
        photoUrl,
        pro,
        learnLanguage,
        nativeLanguage,
        introduction,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
