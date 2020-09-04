import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { offWhite } from '../styles/Common';
import { CheckItem } from '../components/molecules';
import { User } from '../types';
import firebase from '../constants/firebase';
import I18n from '../utils/I18n';
import { MyPageTabStackParamList } from '../navigations/MainTabNavigator';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type ScreenType = StackScreenProps<MyPageTabStackParamList, 'Notice'> &
  Props &
  DispatchProps;

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
const NoticeScreen: React.FC<ScreenType> = ({ user, setUser }) => {
  const { notificationCorrection } = user;
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
  }, [notificationCorrection, setUser, user]);

  // const onPressReview = useCallback(() => {
  //   const f = async (): Promise<void> => {
  //     await firebase
  //       .firestore()
  //       .doc(`users/${user.uid}`)
  //       .update({
  //         notificationReview: !notificationReview,
  //         updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //     setUser({
  //       ...user,
  //       notificationReview: !notificationReview,
  //     });
  //   };
  //   f();
  // }, [notificationReview, setUser, user]);

  return (
    <View style={styles.container}>
      <CheckItem
        checked={notificationCorrection}
        title={I18n.t('notice.finishCorrection')}
        onPress={onPressCorrection}
      />
      {/* <CheckItem
        checked={notificationReview}
        title={I18n.t('notice.finishReview')}
        onPress={onPressReview}
      /> */}
    </View>
  );
};

export default NoticeScreen;
