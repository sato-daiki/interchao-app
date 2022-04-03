import React from 'react';
import { LogBox, StatusBar, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import * as Linking from 'expo-linking';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import Loading from '@/screens/LoadingScreen';

import { configureStore } from '@/stores/Store';
import { firebaseConfig } from '@/constants/firebase';
import * as Sentry from 'sentry-expo';

import RootNavigatorContainer from '@/containers/RootNavigatorContainer';
import { getConfig } from '@/navigations/root';
import BottomBanner from './components/molecules/BottomBanner';

if (Platform.OS !== 'web') {
  // Ignore warnings of firebase
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Remote debugger']);
}

const { store, persistor } = configureStore();

// エラー監視
Sentry.init({
  dsn: 'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: true,
  debug: false,
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const prefix = Linking.makeUrl('/');

const linking = {
  prefixes: [prefix],
  config: getConfig(),
} as LinkingOptions;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar barStyle='dark-content' />
        <ActionSheetProvider>
          <MenuProvider>
            <NavigationContainer linking={linking}>
              <RootNavigatorContainer />
            </NavigationContainer>
          </MenuProvider>
        </ActionSheetProvider>
        <BottomBanner />
      </PersistGate>
    </Provider>
  );
};

export default App;
