// FirebaseAnalyticsに移行予定
import * as Amplitude from 'expo-analytics-amplitude';
import { firestore } from 'firebase';
import { Platform } from 'react-native';
import {
  DEVELOPMENT_AMPLITUDE_API_KEY,
  PRODUCTION_AMPLITUDE_API_KEY,
  // @ts-ignore
} from '@env';
import { captureException } from '@/utils/sentry';
import { User, Profile, Language } from '@/types';

interface Property {
  nativeLanguage: Language;
  points: number;
  createdAt: firestore.FieldValue;
}

const isProduction = !__DEV__;
const apiKey = isProduction
  ? PRODUCTION_AMPLITUDE_API_KEY
  : DEVELOPMENT_AMPLITUDE_API_KEY;

const createPropertiesUser = (user: User, profile: Profile): Property => {
  return {
    nativeLanguage: profile.nativeLanguage,
    points: user.points,
    createdAt: user.createdAt,
  };
};

export const initAnalytics = async (): Promise<void> => {
  // Amplitude webは対応していない
  if (Platform.OS === 'web') return;
  await Amplitude.initializeAsync(apiKey);
};

export const setAnalyticsUser = (user: User, profile: Profile): void => {
  if (Platform.OS === 'web') return;
  Amplitude.setUserIdAsync(user.uid);
  const userProperties = createPropertiesUser(user, profile);
  Amplitude.setUserPropertiesAsync(userProperties);
};

export const track = (eventName: string, properties?: any): void => {
  if (Platform.OS === 'web') return;
  try {
    if (properties) {
      Amplitude.logEventWithPropertiesAsync(eventName, properties);
    } else {
      Amplitude.logEventAsync(eventName);
    }
  } catch (err) {
    captureException(err);
  }
};

export { default as events } from './events';
