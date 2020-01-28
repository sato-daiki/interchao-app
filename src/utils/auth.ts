import * as Facebook from 'expo-facebook';
import firebase, { FacebookAuthProvider } from '../configs/firebase';
import facebook from '../configs/facebook';

type UserCred = firebase.auth.UserCredential;

// メールでのユーザ登録
export const emailSignup = (email: string, password: string): void => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        console.log('Success to Signup');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// メールでログイン
export const emailSignin = (email: string, password: string): void => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('Login Success!');
    })
    .catch(error => {
      console.log(error.message);
    });
};

// Facebookでのユーザ登録
export const facebookSignin = async (): Promise<UserCred | null> => {
  await Facebook.initializeAsync(facebook.ApplicationKey, 'white-zebra');
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    facebook.ApplicationKey,
    {
      permissions: ['public_profile'],
    }
  ).catch(e => {
    console.log(e);
    throw e;
  });

  if (type === 'success') {
    try {
      const credential = FacebookAuthProvider.credential(token);
      const user = await firebase.auth().signInWithCredential(credential);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export default firebase;
