import React, { useEffect } from 'react';
// import whyDidYouRender from '@welldone-software/why-did-you-render';
import { LogBox, StatusBar, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import * as Linking from 'expo-linking';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import * as Updates from 'expo-updates';
import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';

import Loading from '@/screens/LoadingScreen';

import { initAnalytics } from '@/utils/Analytics';
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
  dsn:
    'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
  enableInExpoDevelopment: false,
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

const App = (): JSX.Element => {
  const routeNameRef = React.useRef<string | undefined | null>(null);
  const navigationRef = React.useRef<NavigationContainerRef | null>(null);

  if (__DEV__) {
    // whyDidYouRender(React, {
    //   trackAllPureComponents: true,
    // });
  }

  const checkUpdate = async (): Promise<void> => {
    if (__DEV__ || Platform.OS === 'web') return;

    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Updates.reloadAsync();
    }
  };

  const onReady = (): void => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  const onStateChange = (): void => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // The line below uses the expo-firebase-analytics tracker
      // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      // Change this line to use another Mobile analytics SDK
      console.log('[ScreenName]', currentRouteName);
      if (!__DEV__) {
        Analytics.setCurrentScreen(currentRouteName);
      }
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };

  useEffect(() => {
    initAnalytics();
    checkUpdate();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <ActionSheetProvider>
          <MenuProvider>
            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              onStateChange={onStateChange}
              onReady={onReady}
            >
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
