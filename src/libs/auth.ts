import { Alert } from 'react-native';
import { User } from '../types';
import firebase from '../configs/firebase';

// 匿名でのユーザ登録
export const anonymouslySignUp = async (): Promise<
  firebase.User | void | undefined
> => {
  return firebase
    .auth()
    .signInAnonymously()
    .then(credent => {
      if (credent && credent.user) {
        return credent.user;
      }
    })
    .catch(error => {
      Alert.alert('エラー', 'ネットワークエラーです');
    });
};

// メールでのユーザ登録
export const emailSignUp = async (
  email: string,
  password: string,
  errorSet: (error: any) => void
): Promise<firebase.User | void | undefined> => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(credent => {
      if (credent && credent.user) {
        return credent.user;
      }
    })
    .catch(error => {
      errorSet(error);
    });
};

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
