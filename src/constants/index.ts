import Constants from 'expo-constants';

const isProduction = Constants.manifest.releaseChannel === 'production';

let urlBase;
if (isProduction) {
  urlBase = 'https://interchao.app';
} else if (__DEV__) {
  // urlBase = `https://staging.interchao.com/`;
} else {
  // urlBase = 'http://maintenance.interchao.com';
}

export const URL_BASE = urlBase;
export const SERVICE_NAME = 'Interchao';
