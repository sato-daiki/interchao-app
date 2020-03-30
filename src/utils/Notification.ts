import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from '../constants/firebase';

export const registerForPushNotificationsAsync = async (
  uid: string
): Promise<void> => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  // Get the token that identifies this device
  const expoPushToken = await Notifications.getExpoPushTokenAsync();
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  await firebase
    .firestore()
    .doc(`users/${uid}`)
    .update({
      expoPushToken,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
