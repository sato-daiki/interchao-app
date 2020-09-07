import * as Amplitude from 'expo-analytics-amplitude';
import { firestore } from 'firebase';
import { Platform } from 'react-native';
import {
  DEVELOPMENT_AMPLITUDE_API_KEY,
  PRODUCTION_AMPLITUDE_API_KEY,
  // @ts-ignore
} from '@env';
import Sentry from '../constants/Sentry';
import { User, Profile, Language } from '../types';

interface Property {
  premium: boolean;
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
    premium: !!user.premium,
    nativeLanguage: profile.nativeLanguage,
    points: user.points,
    createdAt: user.createdAt,
  };
};

export const initAnalytics = (): void => {
  // Amplitude webは対応していない
  if (Platform.OS === 'web') return;
  Amplitude.initialize(apiKey);
};

export const setAnalyticsUser = (user: User, profile: Profile): void => {
  if (Platform.OS === 'web') return;
  Amplitude.setUserId(user.uid);
  const userProperties = createPropertiesUser(user, profile);
  Amplitude.setUserProperties(userProperties);
};

export const track = (eventName: string, properties?: any): void => {
  try {
    if (Platform.OS === 'web') return;
    if (properties) {
      Amplitude.logEventWithProperties(eventName, properties);
    } else {
      Amplitude.logEvent(eventName);
    }
  } catch (err) {
    Sentry.captureException(err);
  }
};

export { default as events } from './events';
