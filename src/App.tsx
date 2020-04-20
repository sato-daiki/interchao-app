import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import * as Sentry from 'sentry-expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './constants/firebase';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store } = configureStore();

Sentry.setRelease(Constants.manifest.revisionId || 'DEV');
Sentry.init({
  dsn:
    'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: true,
  debug: true,
});

firebase.initializeApp(firebaseConfig);
const App: React.SFC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <ActionSheetProvider>
        <AppNavigator />
      </ActionSheetProvider>
    </Provider>
  );
};

export default App;
