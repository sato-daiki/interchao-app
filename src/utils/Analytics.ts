import Constants from 'expo-constants';
import * as Amplitude from 'expo-analytics-amplitude';
import {
  DEVELOPMENT_AMPLITUDE_API_KEY,
  PRODUCTION_AMPLITUDE_API_KEY,
} from '@env';

let isInitialized = false;
const isProduction = Constants.manifest.releaseChannel === 'production';
const apiKey = isProduction
  ? PRODUCTION_AMPLITUDE_API_KEY
  : DEVELOPMENT_AMPLITUDE_API_KEY;

export const initAnalytics = (): void => {
  Amplitude.initialize(apiKey);
  isInitialized = true;
};
