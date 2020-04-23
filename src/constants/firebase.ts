import firebase from 'firebase';
import '@firebase/firestore';
import Constants from 'expo-constants';

import {
  PRODUCTION_FIREBASE_API_KEY,
  DEVELOPMENT_FIREBASE_API_KEY,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
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

export default firebase;
