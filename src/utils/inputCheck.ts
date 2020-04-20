import { Alert } from 'react-native';
import firebase from '../constants/firebase';
import I18n from './I18n';

export const emailValidate = (email: string): boolean => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return !expression.test(String(email).toLowerCase());
};

export const emaillExistCheck = async (email: string): Promise<boolean> => {
  const providers = await firebase.auth().fetchSignInMethodsForEmail(email);
  if (
    providers.findIndex(
      p => p === firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    ) !== -1
  ) {
    return true;
  }
  return false;
};

export const emailInputError = (
  error: any,
  setErrorPassword: (message: string) => void,
  setErrorEmail: (message: string) => void,
  clearErrorMessage: () => void
): void => {
  const errorCode = error.code;
  const errorMessage = error.message;

  switch (errorCode) {
    case 'auth/weak-password':
      setErrorPassword(I18n.t('errorMessage.weakPassword'));
      break;
    case 'auth/wrong-password':
      setErrorPassword(I18n.t('errorMessage.wrongPassword'));
      break;
    case 'auth/user-not-found':
      setErrorEmail(I18n.t('errorMessage.userNotFound'));
      break;
    case 'auth/invalid-email':
      setErrorEmail(I18n.t('errorMessage.invalidEmail'));
      break;
    case 'auth/email-already-in-use':
      setErrorEmail(I18n.t('errorMessage.emailAlreadyInUse'));
      break;
    case 'auth/network-request-failed':
      Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.other'));
      clearErrorMessage();
      break;
    case 'auth/too-many-requests':
      Alert.alert(
        I18n.t('common.error'),
        I18n.t('errorMessage.tooManyRequests')
      );
      clearErrorMessage();
      break;
    default:
      Alert.alert(
        I18n.t('common.error'),
        I18n.t('errorMessage.defaultError', { message: errorMessage })
      );
      clearErrorMessage();
  }
};

export const passwordInputError = (
  error: any,
  setErrorCurrentPassword: (message: string) => void,
  setErrorNewPassword: (message: string) => void,
  clearErrorMessage: () => void
): void => {
  const errorCode = error.code;
  const errorMessage = error.message;

  switch (errorCode) {
    case 'auth/weak-password':
      setErrorNewPassword(I18n.t('errorMessage.weakPassword'));
      break;
    case 'auth/wrong-password':
      setErrorCurrentPassword(I18n.t('errorMessage.wrongPassword'));
      break;
    case 'auth/network-request-failed':
      Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.other'));
      clearErrorMessage();
      break;
    case 'auth/too-many-requests':
      Alert.alert(
        I18n.t('common.error'),
        I18n.t('errorMessage.tooManyRequests')
      );
      clearErrorMessage();
      break;
    default:
      Alert.alert(
        I18n.t('common.error'),
        I18n.t('errorMessage.defaultError', { message: errorMessage })
      );
      clearErrorMessage();
  }
};
