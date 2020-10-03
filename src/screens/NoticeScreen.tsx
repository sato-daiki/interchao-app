import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { fontSizeS, offWhite, softRed, subTextColor } from '../styles/Common';
import { CheckItem } from '../components/molecules';
import { User } from '../types';
import firebase from '../constants/firebase';
import I18n from '../utils/I18n';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '../navigations/MyPageTabNavigator';
import { LoadingModal } from '../components/atoms';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type NoticeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'Notice'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: NoticeNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
  title: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginTop: 24,
  },
  noMail: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: softRed,
    fontSize: fontSizeS,
    // lineHeight: fontSizeS * 1.3,
  },
});

/**
 * 通知画面
 */
const NoticeScreen: React.FC<ScreenType> = ({ user, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = firebase.auth();

  const onUpdate = async (
    data: firebase.firestore.UpdateData
  ): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);

    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setUser({
      ...user,
      ...data,
    });
    setIsLoading(false);
  };

  const onPressCorrection = async (): Promise<void> => {
    await onUpdate({ notificationCorrection: !user.notificationCorrection });
  };

  const onPressMailCorrection = async (): Promise<void> => {
    await onUpdate({ mailCorrection: !user.mailCorrection });
  };

  return (
    <View style={styles.container}>
      <LoadingModal />
      <Text style={styles.title}>{I18n.t('notice.push')}</Text>
      <CheckItem
        checked={user.notificationCorrection}
        title={I18n.t('notice.finishCorrection')}
        onPress={onPressCorrection}
      />
      {/* <CheckItem
        checked={notificationReview}
        title={I18n.t('notice.finishReview')}
        onPress={onPressReview}
      /> */}

      <Text style={styles.title}>{I18n.t('notice.mail')}</Text>
      {currentUser && !currentUser.email ? (
        <Text style={styles.noMail}>{I18n.t('notice.noMail')}</Text>
      ) : null}

      <CheckItem
        checked={user.mailCorrection || false}
        title={I18n.t('notice.finishCorrection')}
        onPress={onPressMailCorrection}
        disable={!currentUser || !currentUser.email}
      />
    </View>
  );
};

export default NoticeScreen;
