import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Space, SubmitButton } from '../atoms';
import { CheckTextInput } from '../molecules';
import { primaryColor, fontSizeM, linkBlue } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  isSignUp: boolean;
  isEmailLoading: boolean;
  isSubmitLoading: boolean;
  isEmailCheckOk: boolean;
  isPasswordCheckOk: boolean;
  email: string;
  password: string;
  errorEmail: string;
  errorPassword: string;
  onChangeTextEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onEndEditingEmail: () => void;
  onEndEditingPassword: () => void;
  onPressSubmit: () => void;
  onPressForget?: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  forgetText: {
    color: primaryColor,
    fontSize: fontSizeM,
    textAlign: 'center',
  },
  linkText: {
    color: linkBlue,
  },
});

/**
 * 概要：サインインとサインアップの共通フォーム
 */
const SignInUpForm: React.FC<Props> = ({
  isSignUp,
  isEmailLoading,
  isSubmitLoading,
  isEmailCheckOk,
  isPasswordCheckOk,
  email,
  password,
  errorEmail,
  errorPassword,
  onChangeTextEmail,
  onChangePassword,
  onEndEditingEmail,
  onEndEditingPassword,
  onPressSubmit,
  onPressForget,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.label}>{I18n.t('signInUpForm.email')}</Text>
        <CheckTextInput
          value={email}
          onChangeText={onChangeTextEmail}
          onEndEditing={onEndEditingEmail}
          maxLength={50}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          isLoading={isEmailLoading}
          isCheckOk={isEmailCheckOk}
          errorMessage={errorEmail}
        />
        <Space size={16} />
        <Text style={styles.label}>{I18n.t('signInUpForm.password')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={onChangePassword}
          onEndEditing={onEndEditingPassword}
          maxLength={20}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="done"
          isCheckOk={isPasswordCheckOk}
          errorMessage={errorPassword}
        />
        <Space size={32} />
        <SubmitButton
          title={
            isSignUp ? I18n.t('common.next') : I18n.t('signInUpForm.login')
          }
          onPress={onPressSubmit}
          isLoading={isSubmitLoading}
          disable={!(isEmailCheckOk && isPasswordCheckOk)}
        />
        {isSignUp ? null : (
          <>
            <Space size={16} />
            <Text style={styles.forgetText}>
              {I18n.t('signInUpForm.forgetText')}
              <Text style={styles.linkText} onPress={onPressForget}>
                {I18n.t('signInUpForm.link')}
              </Text>
            </Text>
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignInUpForm;
