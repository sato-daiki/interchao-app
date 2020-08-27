import React, { useEffect, useState } from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import { MenuProvider } from 'react-native-popup-menu';
// import Updates from 'expo-updates';
import { Updates } from 'expo';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { createAppNavigator } from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './constants/firebase';
import Loading from './screens/LoadingScreen';
import I18n from './utils/I18n';
import Sentry from './constants/Sentry';
import { ModalConfirm } from './components/organisms';
import { getIsProduction } from './utils/common';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store, persistor } = configureStore();

// エラー監視
Sentry.init({
  dsn:
    'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: true,
  debug: !getIsProduction(),
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.SFC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkUpdate = async (): Promise<void> => {
    if (__DEV__) return;

    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const AppNavigator = createAppNavigator(isDesktopOrLaptopDevice);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <ActionSheetProvider>
          <MenuProvider>
            <ModalConfirm
              visible={isVisible}
              title={I18n.t('app.updateTitle')}
              message={I18n.t('app.updateMessage')}
              mainButtonText={I18n.t('app.updateOk')}
              onPressMain={(): void => Updates.reload()}
            />
            <AppNavigator />
          </MenuProvider>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
