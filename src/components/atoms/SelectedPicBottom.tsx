import React from 'react';
import { StyleSheet, View } from 'react-native';
import { pinBlue } from '../../styles/Common';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // alignContent: 'flex-end',
    zIndex: 1,
    right: -7,
    bottom: -7,
  },
  cicleBottom: {
    right: 3.5,
    backgroundColor: pinBlue,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stick: {
    width: 1.5,
    height: 16,
    backgroundColor: pinBlue,
  },
});

const SelectedPicBottom: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.stick} />
      <View style={styles.cicleBottom} />
    </View>
  );
};

export default SelectedPicBottom;
