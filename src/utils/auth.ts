import * as Facebook from 'expo-facebook';
import { Linking } from 'expo';
import * as Google from 'expo-google-app-auth';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
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

// メールでログイン
export const phoneSignUp = async (): // phone: string,
// password: string
Promise<void> => {
  const captchaUrl = `https://white-zebra-dev.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl(
    ''
  )}`;
  const listener = ({ url }) => {
    console.log('phoneSignUp');
    console.log('url:', url);

    WebBrowser.dismissBrowser();
    const tokenEncoded = Linking.parse(url).queryParams.token;
    console.log('tokenEncoded:', tokenEncoded);

    if (tokenEncoded) {
      const token = decodeURIComponent(tokenEncoded);
      console.log('token:', token);

      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token),
      };
      console.log('captchaVerifier:', captchaVerifier);

      firebase
        .auth()
        .signInWithPhoneNumber('+81 70-2650-9668', captchaVerifier)
        .then(confirmResult => {
          setConfirmResult(confirmResult);
          setMessage('Code has been sent!');
        })
        .catch(error => {
          setMessage(`Sign In With Phone Number Error: ${error.message}`);
        });
    }
  };
  console.log('end');

  Linking.addEventListener('url', listener);
  WebBrowser.openBrowserAsync(captchaUrl).then(() => {
    Linking.removeEventListener('url', listener);
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

// Googelでのユーザ登録
const isUserEqual = (
  googleUser: Google.LogInResult,
  firebaseUser: firebase.User
): boolean => {
  if (firebaseUser) {
    const { providerData } = firebaseUser;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        return true;
      }
    }
  }
  return false;
};

const onSignInGoolge = (googleUser: Google.LogInResult): void => {
  const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
    unsubscribe();
    if (!isUserEqual(googleUser, firebaseUser)) {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          console.log('success');
        })
        .catch(({ massage }) => alert('messgage', massage));
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
};

export const goolgeSignUp = async () => {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      androidClientId:
        '975945165729-l58crudfj4bqs737hi2a8m9use1asjrg.apps.googleusercontent.com',
      iosClientId:
        '975945165729-dlspp12h2bbol4ecvdm6g06gte1k0adr.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      onSignInGoolge(result);
      return result.accessToken;
    }
    return { cancelled: true };
  } catch (e) {
    return { error: true };
  }
};

export default firebase;
