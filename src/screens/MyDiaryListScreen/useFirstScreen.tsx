import { useEffect, useRef } from 'react';
import {
  getExpoPushToken,
  registerForPushNotificationsAsync,
} from '@/utils/Notification';
import { Subscription } from '@unimodules/core';
import * as Notifications from 'expo-notifications';
import { LocalStatus } from '@/types';
import { getUnreadCorrectionNum } from '@/utils/localStatus';
import { User } from 'sentry-expo';

interface Props {
  user: User;
  localStatus: LocalStatus;
  setLocalStatus: (localStatus: LocalStatus) => void;
  onResponseReceived: () => void;
}

/*
 * 一番最初の画面で行う処理一覧
 */
export const useFirstScreen = ({
  user,
  localStatus,
  onResponseReceived,
  setLocalStatus,
}: Props): void => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      // expoへの登録
      const expoPushToken = await getExpoPushToken();
      if (expoPushToken && localStatus.uid) {
        // localStatusの方を使わないと初回登録時落ちる
        await registerForPushNotificationsAsync(localStatus.uid, expoPushToken);
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      // ユーザ情報を更新し直す（badgeのカウントの対応のため）
      const newUnreadCorrectionNum = await getUnreadCorrectionNum(user.uid);
      if (newUnreadCorrectionNum !== null) {
        Notifications.setBadgeCountAsync(newUnreadCorrectionNum);
        setLocalStatus({
          ...localStatus,
          unreadCorrectionNum: newUnreadCorrectionNum,
        });
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener(
    //   prm => {
    //     console.log('[usePushNotification] catched notification', prm);
    //     onRefresh();
    //   }
    // );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log('[usePushNotification] catched notificationRes');
        onResponseReceived();
      }
    );

    return (): void => {
      // if (notificationListener.current) {
      //   Notifications.removeNotificationSubscription(
      //     notificationListener.current
      //   );
      // }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
