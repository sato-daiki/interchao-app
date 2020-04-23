import { ImageSourcePropType } from 'react-native';
import { Profile, Language } from '../types';
import firebase from '../constants/firebase';
import { Zebbu, Zenny } from '../images';

export const getPhotoUrl = (
  photoUrl: string | null,
  nativeLanguage: Language
): ImageSourcePropType => {
  if (photoUrl) {
    return { uri: photoUrl };
  }
  if (nativeLanguage === 'ja') {
    return Zebbu;
  }
  return Zenny;
};

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

// ユーザー名の重複チェック
export const checkDuplicatedUserName = async (
  userName: string
): Promise<boolean> => {
  const docs = await firebase
    .firestore()
    .collection('profiles')
    .where('userName', '==', userName)
    .get();

  if (docs.empty) {
    // 重複なし
    return true;
  }
  return false;
};

// 入力された文字チェック
export const checkTypeUserName = (text: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const letters = /^[a-zA-Z0-9\_\.]+$/;
  if (text.match(letters)) {
    return true;
  }
  return false;
};

// 先頭チェック
export const checkInitialUserName = (text: string): boolean => {
  const initialText = text.slice(0, 1);
  // eslint-disable-next-line no-useless-escape
  const letters = /^[_\.]+$/;
  if (initialText.match(letters)) {
    return false;
  }
  return true;
};
