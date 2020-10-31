import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '@/constants/firebase';
import { mainColor } from '@/styles/Common';
import { getIsAfterDay } from '@/utils/common';
import { User } from '@/types';
import { AppDownload } from '@/components/web/molecules';
import { Hoverable } from '@/components/atoms';

interface Props {
  user: User;
  setUser: (user: User) => void;
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

const ModalAppSuggestion = ({ user, setUser }: Props): JSX.Element | null => {
  const [visible, setVisible] = useState(true);

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const onPressClose = useCallback(async () => {
    setVisible(false);
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        lastModalAppSuggestionAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setUser({
      ...user,
      lastModalAppSuggestionAt: firebase.firestore.Timestamp.now(),
    });
  }, [setUser, user]);

  if (
    Platform.OS === 'web' &&
    isTabletOrMobileDevice &&
    visible &&
    (!user.lastModalAppSuggestionAt ||
      getIsAfterDay(user.lastModalAppSuggestionAt, 7))
  ) {
    return (
      <View style={styles.container}>
        <Hoverable style={styles.icon} onPress={onPressClose}>
          <MaterialCommunityIcons
            size={28}
            color="#fff"
            name="close-circle-outline"
          />
        </Hoverable>
        <AppDownload isWhite={false} />
      </View>
    );
  }
  return null;
};

export default ModalAppSuggestion;
