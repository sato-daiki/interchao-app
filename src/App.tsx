import React, { useEffect } from 'react';
import { YellowBox, StatusBar, Alert } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import { MenuProvider } from 'react-native-popup-menu';
// import Updates from 'expo-updates';
import { Updates } from 'expo';

import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './constants/firebase';
import Loading from './screens/LoadingScreen';
import I18n from './utils/I18n';
import Sentry from './constants/Sentry';
import DefaultLayout from './components/template/DefaultLayout';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store, persistor } = configureStore();

// エラー監視
Sentry.init({
  dsn:
    'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: true,
  debug: Constants.manifest.releaseChannel !== 'production',
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.SFC = () => {
  const checkUpdate = async (): Promise<void> => {
    if (__DEV__) return;

    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      Alert.alert(
        I18n.t('app.updateTitle'),
        I18n.t('app.updateMessage'),
        [
          {
            text: I18n.t('app.updateOk'),
            onPress: (): void => {
              Updates.reload();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <DefaultLayout>
          <StatusBar barStyle="dark-content" />
          <ActionSheetProvider>
            <MenuProvider>
              <AppNavigator />
            </MenuProvider>
          </ActionSheetProvider>
        </DefaultLayout>
      </PersistGate>
    </Provider>
  );
};

export default App;
