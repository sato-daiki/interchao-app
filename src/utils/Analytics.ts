import * as Analytics from 'expo-firebase-analytics';

export const logAnalytics = async (eventName: string) => {
  await Analytics.logEvent(eventName);
};

export { default as events } from './events';
