import firebase from '../constants/firebase';
import I18n from './I18n';
import { alert } from './ErrorAlert';

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
  err: Error & { code?: string },
  setErrorPassword: (message: string) => void,
  setErrorEmail: (message: string) => void,
  clearErrorMessage: () => void
): void => {
  switch (err.code) {
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
    default:
      alert({ err });
      clearErrorMessage();
  }
};

export const passwordInputError = (
  err: Error & { code?: string },
  setErrorCurrentPassword: (message: string) => void,
  setErrorNewPassword: (message: string) => void,
  clearErrorMessage: () => void
): void => {
  switch (err.code) {
    case 'auth/weak-password':
      setErrorNewPassword(I18n.t('errorMessage.weakPassword'));
      break;
    case 'auth/wrong-password':
      setErrorCurrentPassword(I18n.t('errorMessage.wrongPassword'));
      break;
    default:
      alert({ err });
      clearErrorMessage();
  }
};
