import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Space, SubmitButton, FacebookButton, GoogleButton } from '../atoms';
import { CheckTextInput } from '../molecules';
import {
  primaryColor,
  fontSizeM,
  fontSizeS,
  borderLightColor,
  subTextColor,
  linkBlue,
} from '../../styles/Common';

interface Props {
  isSignUp: boolean;
  isEmailLoading: boolean;
  isSubmitLoading: boolean;
  isFacebookLoading: boolean;
  isGoogleLoading: boolean;
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
  onPressFacebook: () => void;
  onPressGoolge: () => void;
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
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  subText: {
    textAlign: 'center',
    color: subTextColor,
    fontSize: fontSizeS,
    paddingHorizontal: 16,
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
  isFacebookLoading,
  isGoogleLoading,
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
  onPressFacebook,
  onPressGoolge,
  onPressForget,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>メールアドレス</Text>
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
      <Text style={styles.label}>パスワード（６ケタ以上）</Text>
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
        title={isSignUp ? '次へ' : 'ログイン'}
        onPress={onPressSubmit}
        isLoading={isSubmitLoading}
        disable={!(isEmailCheckOk && isPasswordCheckOk)}
      />
      {isSignUp ? null : (
        <>
          <Space size={16} />
          <Text style={styles.forgetText}>
            パスワードをお忘れの方は
            <Text style={styles.linkText} onPress={onPressForget}>
              こちら
            </Text>
          </Text>
        </>
      )}
      <Space size={32} />
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.subText}>もしくは</Text>
        <View style={styles.line} />
      </View>
      <Space size={32} />
      <FacebookButton
        title={isSignUp ? 'Facebookで登録' : 'Facebookでログイン'}
        isLoading={isFacebookLoading}
        onPress={onPressFacebook}
      />
      <Space size={16} />
      <GoogleButton
        title={isSignUp ? 'Googleで登録' : 'Facebookでログイン'}
        isLoading={isGoogleLoading}
        onPress={onPressGoolge}
      />
    </View>
  );
};

export default SignInUpForm;
