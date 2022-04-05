import firebase from 'firebase';
import '@firebase/firestore';
import Constants from 'expo-constants';
//@ts-ignore
import {
  PRODUCTION_FIREBASE_API_KEY,
  DEVELOPMENT_FIREBASE_API_KEY,
} from '@env';

const isProduction = !__DEV__;
const extraConfig = isProduction
  ? Constants.manifest?.extra?.production.firebase
  : Constants.manifest?.extra?.development.firebase;

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

export default firebase;
