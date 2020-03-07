import Constants from 'expo-constants';
import * as Amplitude from 'expo-analytics-amplitude';
import { firestore } from 'firebase';
import {
  DEVELOPMENT_AMPLITUDE_API_KEY,
  PRODUCTION_AMPLITUDE_API_KEY,
} from '@env';
import { User, Profile, Language } from '../types';

interface Property {
  premium: boolean;
  nativeLanguage: Language;
  points: number;
  createdAt: firestore.FieldValue;
}

const isProduction = Constants.manifest.releaseChannel === 'production';
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
  Amplitude.initialize(apiKey);
};

export const setAnalyticsUser = (user: User, profile: Profile): void => {
  Amplitude.setUserId(user.uid);
  const userProperties = createPropertiesUser(user, profile);
  Amplitude.setUserProperties(userProperties);
};

export const setLogEvent = (eventName: string, properties?: any): void => {
  try {
    if (properties) {
      Amplitude.logEventWithProperties(eventName, properties);
    } else {
      Amplitude.logEvent(eventName);
    }
  } catch (err) {
    console.log(err);
  }
};

export { default as events } from './events';