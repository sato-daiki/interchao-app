import React from 'react';
import { YellowBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigations/AppNavigator';
import { configureStore } from './stores/Store';

// Ignore warnings of firebase
YellowBox.ignoreWarnings(['Setting a timer']);

const { store } = configureStore();

const App: React.SFC = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;