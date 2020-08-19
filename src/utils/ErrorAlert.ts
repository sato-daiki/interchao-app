import { Alert } from 'react-native';
import Sentry from '../constants/Sentry';
import I18n from './I18n';

interface ErrorAlert {
  err: Error & { code?: string };
  onPressOk?: () => void;
}

export const alert = ({ err, onPressOk }: ErrorAlert): void => {
  const title = 'エラー';
  let { message } = err;

  if (err.code) {
    // firebase系のエラー
    switch (err.code) {
      case 'auth/network-request-failed':
        message = I18n.t('errorMessage.network');
        break;
      case 'auth/too-many-requests':
        message = I18n.t('errorMessage.tooManyRequests');
        break;
      default:
        message = I18n.t('errorMessage.defaultError', { message });
        break;
    }
  } else {
    message = I18n.t('errorMessage.defaultError', { message });
  }
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: onPressOk,
    },
  ]);
  Sentry.captureException(err);
};
