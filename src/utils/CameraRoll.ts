import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Alert, CameraRoll } from 'react-native';
import { SERVICE_NAME } from '../constants';
import I18n from './I18n';

export const askPermissionsAsync = async (): Promise<Permissions.PermissionStatus> => {
  // await Permissions.askAsync(Permissions.CAMERA);
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  return status;
};

export const openAlert = (): void => {
  Alert.alert(
    I18n.t('cameraRoll.permitTitle'),
    I18n.t('cameraRoll.permitMessage', {
      name: SERVICE_NAME,
    }),
    [{ text: 'OK' }],
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
