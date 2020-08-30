import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../../../constants/firebase';
import { mainColor } from '../../../styles/Common';
import { getIsAfterDay } from '../../../utils/common';
import { AppDownload } from '../molecules';
import { User } from '../../../types';

interface Props {
  user: User;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: mainColor,
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    alignContent: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
  },
});

const ModalAppSuggestion = ({ user }: Props): JSX.Element | null => {
  const [visible, setVisible] = useState(true);

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const onPressClose = (): void => {
    firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        lastModalAppSuggestionAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setVisible(false);
  };

  if (
    Platform.OS === 'web' &&
    isTabletOrMobileDevice &&
    visible &&
    (!user.lastModalAppSuggestionAt ||
      getIsAfterDay(user.lastModalAppSuggestionAt, 7))
  ) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={onPressClose}>
          <MaterialCommunityIcons
            size={28}
            color="#fff"
            name="close-circle-outline"
          />
        </TouchableOpacity>
        <AppDownload isWhite={false} />
      </View>
    );
  }
  return null;
};

export default ModalAppSuggestion;
