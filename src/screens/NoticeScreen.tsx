import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { offWhite } from '../styles/Common';
import { CheckItem } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { User } from '../types';
import firebase from '../constants/firebase';

interface Props {
  user: User;
  setUser: (user: User) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
});

/**
 * 通知画面
 */
const NoticeScreen: ScreenType = ({ user, setUser }) => {
  const { notificationReview, notificationCorrection } = user;
  const onPressCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      await firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .update({
          notificationCorrection: !notificationCorrection,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setUser({
        ...user,
        notificationCorrection: !notificationCorrection,
      });
    };
    f();
  }, [user]);

  const onPressReview = useCallback(() => {
    const f = async (): Promise<void> => {
      await firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .update({
          notificationReview: !notificationReview,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setUser({
        ...user,
        notificationReview: !notificationReview,
      });
    };
    f();
  }, [user]);

  return (
    <View style={styles.container}>
      <CheckItem
        checked={notificationCorrection}
        title="マイ日記の添削が完了"
        onPress={onPressCorrection}
      />
      <CheckItem
        checked={notificationReview}
        title="レビューが届く"
        onPress={onPressReview}
      />
    </View>
  );
};

NoticeScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '通知',
  };
};

export default NoticeScreen;
