import { Alert } from 'react-native';
import firebase from '../configs/firebase';

export const emailValidate = (email: string): boolean => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return !expression.test(String(email).toLowerCase());
};

export const emaillExistCheck = async (email: string): Promise<boolean> => {
  const providers = await firebase.auth().fetchSignInMethodsForEmail(email);
  console.log('providers,providers', providers);
  if (
    providers.findIndex(
      p => p === firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    ) !== -1
  ) {
    console.log('登録');
    return true;
  }
  console.log('not yet');

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
      setErrorPassword('パスワードは6桁以上で入力してください');
      break;
    case 'auth/invalid-email':
      setErrorEmail('メールアドレスの形式が正しくありません');
      break;
    case 'auth/email-already-in-use':
      setErrorEmail('このメールアドレスはすでに登録されています');
      break;
    case 'auth/network-request-failed':
      Alert.alert(
        'エラー',
        'ネットワークエラーです。電波のいい箇所で再度お試しください'
      );
      clearErrorMessage();
      break;
    default:
      Alert.alert('エラー', 'エラーが発生しました。', errorMessage);
      clearErrorMessage();
  }
};
