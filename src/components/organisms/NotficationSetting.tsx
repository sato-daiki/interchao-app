import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import '@expo/match-media';
import I18n from '@/utils/I18n';
import firebase from '@/constants/firebase';
import { mainColor } from '@/styles/Common';
import { getIsAfterDay } from '@/utils/common';
import { User } from '@/types';
import { Note } from '@/components/atoms';

interface Props {
  user: User;
  setUser: (user: User) => void;
}

const NotficationSetting = ({ user, setUser }: Props) => {
  const [visible, setVisible] = useState(true);
  const [isPermission, setIsPermission] = useState(true);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        setIsPermission(false);
      } else {
        setIsPermission(true);
      }
    };

    f();
  }, []);

  const onPressClose = useCallback(async (): Promise<void> => {
    setVisible(false);
    await firebase.firestore().doc(`users/${user.uid}`).update({
      lastModalNotficationSettingAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setUser({
      ...user,
      lastModalNotficationSettingAt: firebase.firestore.Timestamp.now(),
    });
  }, [setUser, user]);

  // 出力条件アプリ、通知の設定がしていない、初回日記投稿済み、（一週間以内にアラートを出した or まだ一度もメッセージを出していない）
  return (
    <Note
      text={I18n.t('myDiaryList.notficationSetting')}
      backgroundColor={mainColor}
      color='#fff'
      visible={
        Platform.OS !== 'web' &&
        !isPermission &&
        visible &&
        user.diaryPosted &&
        (!user.lastModalNotficationSettingAt ||
          getIsAfterDay(user.lastModalNotficationSettingAt, 7))
      }
      onPressClose={onPressClose}
    />
  );
};

export default React.memo(NotficationSetting);
