import { Alert } from 'react-native';
import { Profile } from '../types';
import firebase from '../constants/firebase';

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
  profile: Profile,
  errorSet: (error: any) => void
): Promise<void | firebase.User> => {
  try {
    const credent = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = credent;
    if (!user) return;

    const batch = firebase.firestore().batch();
    batch.set(firebase.firestore().doc(`users/${user.uid}`), {
      premium: false,
      confirmDiary: false,
      confirmReview: false,
      points: 10,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    batch.set(firebase.firestore().doc(`profiles/${user.uid}`), {
      name: '',
      userName: profile.userName,
      photoUrl: '',
      pro: false,
      learnLanguage: profile.learnLanguage,
      nativeLanguage: profile.nativeLanguage,
      introduction: '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.commit();
  } catch (error) {
    errorSet(error);
  }
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
