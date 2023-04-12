import { useEffect, useRef, useCallback, useState } from 'react';
import { AppState } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import * as Notifications from 'expo-notifications';
import { Subscription } from '@unimodules/core';

import { LocalStatus } from '@/types';
import { setPushotifications } from '@/utils/Notification';

interface Props {
  localStatus: LocalStatus;
  onResponseReceived: () => void;
}

/*
 * 一番最初の画面で行う処理一覧
 */
export const useFirstScreen = ({
  localStatus,
  onResponseReceived,
}: Props): void => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const initPushotifications = useCallback(() => {
    console.log('useFirstScreen', localStatus.firstLogin, localStatus.uid);
    // 初回登録でskipした場合は入らないようにする
    if (!localStatus.firstLogin && localStatus.uid) {
      setPushotifications(localStatus.uid);
    }
  }, [localStatus.firstLogin, localStatus.uid]);

  const initAd = useCallback(async () => {
    const { status } = await requestTrackingPermissionsAsync();
    if (status === 'granted') {
      console.log('Yay! I have user permission to track data');
    }
    // await mobileAds().initialize();
  }, []);

  const initActiveFunctions = useCallback(() => {
    initAd();
  }, [initAd]);

  const initFirstTimeOnlyFunctions = useCallback(() => {
    initPushotifications();
  }, [initPushotifications]);

  useEffect(() => {
    initFirstTimeOnlyFunctions();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 画面がアクティブになったら呼ぶやつ
        initActiveFunctions();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
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
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('[usePushNotification] catched notificationRes');
        onResponseReceived();
      });

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
