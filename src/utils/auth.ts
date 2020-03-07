import { Alert } from 'react-native';
import { Profile } from '../types';
import firebase from '../constants/firebase';

// ユーザー名の重複チェック
export const checkUserName = async (userName: string): Promise<boolean> => {
  const doc = await firebase
    .firestore()
    .collection('profiles')
    .where('userName', '==', userName)
    .get();

  if (doc.empty) {
    return false;
  }
  return true;
};
