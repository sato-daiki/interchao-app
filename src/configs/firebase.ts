import firebase from 'firebase';
import Constants from 'expo-constants';
import {
  PRODUCTION_FIREBASE_API_KEY,
  DEVELOPMENT_FIREBASE_API_KEY,
  FACEBOOK_APP_KEY,
  GOOGLE_ANDROID_KEY,
  GOOGLE_IOS_KEY,
} from '@env';

const isProduction = Constants.manifest.releaseChannel === 'production';
const extraConfig = isProduction
  ? Constants.manifest.extra.production.firebase
  : Constants.manifest.extra.development.firebase;

export const firebaseConfig = {
  apiKey: isProduction
    ? PRODUCTION_FIREBASE_API_KEY
    : DEVELOPMENT_FIREBASE_API_KEY,
  authDomain: extraConfig.authDomain,
  databaseURL: extraConfig.databaseURL,
  projectId: extraConfig.projectId,
  storageBucket: extraConfig.storageBucket,
  messagingSenderId: extraConfig.messagingSenderId,
  appId: extraConfig.appId,
  measurementId: extraConfig.measurementId,
};

export const facebookConfig = { ApplicationKey: FACEBOOK_APP_KEY };
export const googleConfig = {
  androidClientId: GOOGLE_ANDROID_KEY,
  iosClientId: GOOGLE_IOS_KEY,
};

export const { FacebookAuthProvider, GoogleAuthProvider } = firebase.auth;

export default firebase;
