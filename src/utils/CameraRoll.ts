import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Alert, CameraRoll } from 'react-native';
import openBrowserSafely from '../constants/SafeWebBrowser';
import { SERVICE_NAME } from '../constants';

export const askPermissionsAsync = async (): Promise<Permissions.PermissionStatus> => {
  // await Permissions.askAsync(Permissions.CAMERA);
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  return status;
};

export const openAlert = () => {
  Alert.alert(
    'アクセス許可が必要です',
    `${SERVICE_NAME}にカメラロールのアクセス許可が必要です`,
    [
      {
        text: '設定方法',
        onPress: () => {
          openBrowserSafely('https://maricuru.com/helps/13');
        },
      },
      { text: 'OK' },
    ],
    { cancelable: false }
  );
};
export async function openCameraRoll(
  options = {}
): Promise<ImagePicker.ImagePickerResult> {
  const status = await askPermissionsAsync();
  if (status !== 'granted') {
    openAlert();
    return { cancelled: true };
  }
  const result = await ImagePicker.launchImageLibraryAsync(options);
  return result;
}

export async function saveToCameraRoll(tag: string) {
  const status = await askPermissionsAsync();
  if (status !== 'granted') {
    openAlert();
    return { cancelled: true };
  }
  return CameraRoll.saveToCameraRoll(tag);
}
