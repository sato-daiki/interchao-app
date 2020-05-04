import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingModal } from '../components/atoms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingScreen: React.FC<{}> = (): JSX.Element => (
  <View style={styles.container}>
    <LoadingModal visible />
  </View>
);
export default LoadingScreen;
