import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import firebase from '../constants/firebase';

// アプリ起動中のPush通知設定
// https://docs.expo.io/versions/latest/sdk/notifications/#handling-incoming-notifications-when-the-app-is
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const getExpoPushToken = async (): Promise<null | string> => {
  let expoPushToken;
  if (Platform.OS === 'web') return null;

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
      return null;
    }
    expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return expoPushToken;
};

const registerForPushNotificationsAsync = async (
  uid: string,
  expoPushToken: string
): Promise<void> => {
  await firebase
    .firestore()
    .doc(`users/${uid}`)
    .update({
      expoPushToken,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const setPushotifications = async (
  uid: string
): Promise<string | null> => {
  // expoへの登録
  const expoPushToken = await getExpoPushToken();
  if (expoPushToken) {
    // localStatusの方を使わないと初回登録時落ちる
    await registerForPushNotificationsAsync(uid, expoPushToken);
  }
  return expoPushToken;
};
