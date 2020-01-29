import React from 'react';
import { YellowBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';
import { firebaseConfig } from './configs/firebase';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store } = configureStore();

firebase.initializeApp(firebaseConfig);

const App: React.SFC = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
