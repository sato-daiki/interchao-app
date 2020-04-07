import React from 'react';
import { YellowBox, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './constants/firebase';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store } = configureStore();

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
