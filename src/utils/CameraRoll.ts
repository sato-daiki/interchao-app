import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { Alert, Platform } from 'react-native';
import firebase from '../constants/firebase';
import { SERVICE_NAME } from '../constants';
import I18n from './I18n';

export const askPermissionsAsync = async (): Promise<Permissions.PermissionStatus> => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  return status;
};

const openAlert = (): void => {
  Alert.alert(
    I18n.t('cameraRoll.permitTitle'),
    I18n.t('cameraRoll.permitMessage', {
      name: SERVICE_NAME,
    }),
    [{ text: 'OK' }],
    { cancelable: false }
  );
};

export const uploadImageAsync = async (
  photoUrl: string,
  path: string,
  width = 300
): Promise<string> => {
  const ret = await ImageManipulator.manipulateAsync(photoUrl, [
    { resize: { width } },
  ]);

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(path);

  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      resolve(xhr.response);
    };
    xhr.onerror = (): void => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', ret.uri, true);
    xhr.send(null);
  });

  const snapshot = await imageRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  return url;
};

export async function openCameraRoll(
  options = {}
): Promise<ImagePicker.ImagePickerResult> {
  if (Platform.OS !== 'web') {
    const status = await askPermissionsAsync();
    if (status !== 'granted') {
      openAlert();
      return { cancelled: true };
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync(options);
  return result;
}
