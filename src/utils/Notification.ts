import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { NavigationStackProp } from 'react-navigation-stack';
import { Platform } from 'react-native';
import firebase from '../constants/firebase';

export const registerForPushNotificationsAsync = async (
  uid: string
): Promise<void> => {
  if (Platform.OS === 'web') return;
  // 実機端末か否かを判定
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }
    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    console.log(expoPushToken);

    await firebase
      .firestore()
      .doc(`users/${uid}`)
      .update({
        expoPushToken,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};

const generateNotificationHandler = (
  navigation: NavigationStackProp,
  onRefresh: () => void
) => {
  return async function notificationHandler(notification): Promise<void> {
    const { origin, data } = notification;
    if (origin !== 'selected' || !data.navigate) {
      return;
    }
    if (data.navigate === 'myDiaryList') {
      // 通知をクリックした場合
      navigation.navigate('MyDiaryList');
      onRefresh();
    }
  };
};

export const addLisner = (
  navigation: NavigationStackProp,
  onRefresh: () => void
): void => {
  const notificationHandler = generateNotificationHandler(
    navigation,
    onRefresh
  );
  Notifications.addListener(notificationHandler);
};
