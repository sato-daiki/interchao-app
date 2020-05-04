import React, { useEffect } from 'react';
import { YellowBox, StatusBar } from 'react-native';
import * as Sentry from 'sentry-expo';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import { Updates } from 'expo';
import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './constants/firebase';
import Loading from './screens/LoadingScreen';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store, persistor } = configureStore();

// エラー監視
Sentry.setRelease(Constants.manifest.revisionId || 'DEV');
Sentry.init({
  dsn:
    'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: true,
  debug: true,
});

firebase.initializeApp(firebaseConfig);
const App: React.SFC = () => {
  // OTAファイルの更新
  const checkUpdate = async (): Promise<void> => {
    if (__DEV__) return;

    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      Updates.reload();
    }
  };
  useEffect(() => {
    checkUpdate();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <ActionSheetProvider>
          <AppNavigator />
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
