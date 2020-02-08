import * as Facebook from 'expo-facebook';
import { Linking } from 'expo';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-google-app-auth';
import firebase, {
  facebookConfig,
  googleConfig,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from '../configs/firebase';

// メールでのユーザ登録
export const emailSignUp = (email: string, password: string): void => {
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

// // メールでログイン
// export const emailSignin = (email: string, password: string): void => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(response => {
//       console.log('Login Success!');
//     })
//     .catch(error => {
//       console.log(error.message);
//     });
// };

// 電話番号で登録
export const phoneSignUp = async (
  phoneNumber: string
): Promise<firebase.auth.ConfirmationResult | null> => {
  const captchaUrl = `https://white-zebra-5096f.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl(
    ''
  )}`;

  let token: string | null = null;
  const listener = ({ url }): void => {
    WebBrowser.dismissBrowser();
    const tokenEncoded = Linking.parse(url).queryParams.token;
    if (tokenEncoded) token = decodeURIComponent(tokenEncoded);
  };

  Linking.addEventListener('url', listener);
  await WebBrowser.openBrowserAsync(captchaUrl);
  Linking.removeEventListener('url', listener);
  if (token) {
    // fake firebase.auth.ApplicationVerifier
    const captchaVerifier = {
      type: 'recaptcha',
      verify: () => Promise.resolve(token),
    };
    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, captchaVerifier);
      return confirmationResult;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
  return null;
};

// Facebookでのユーザ登録
export const facebookSignUp = async () => {
  await Facebook.initializeAsync(facebookConfig.ApplicationKey, 'white-zebra');
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    facebookConfig.ApplicationKey,
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
        providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
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
      const credential = GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          console.log('success');
        })
        .catch(e => console.log('e', e));
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
};

export const goolgeSignUp = async () => {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      androidClientId: googleConfig.androidClientId,
      iosClientId: googleConfig.iosClientId,
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
