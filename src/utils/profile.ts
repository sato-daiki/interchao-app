import { ImageSourcePropType } from 'react-native';
import { Language, Profile } from '@/types';
import firebase from '@/constants/firebase';
import { Zebbu, Zenny } from '@/images';

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

export const getUid = async (userName: string): Promise<string | null> => {
  const docs = await firebase
    .firestore()
    .collection('profiles')
    .where('userName', '==', userName)
    .get();

  if (docs.empty) {
    return null;
  }
  const uids: string[] = [];
  docs.forEach(doc => {
    uids.push(doc.id);
  });
  return uids[0];
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
      return {
        uid,
        ...data,
      } as Profile;
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
