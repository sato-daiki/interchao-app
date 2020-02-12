import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import {
  emailSignUp,
  goolgeSignUp,
  phoneSignUp,
  facebookSignUp,
} from '../utils/auth';
import {
  primaryColor,
  fontSizeM,
  fontSizeS,
  offWhite,
  borderLightColor,
  subTextColor,
} from '../styles/Common';
import Space from '../components/atoms/Space';
import SubmitButton from '../components/atoms/SubmitButton';

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
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: borderLightColor,
    paddingHorizontal: 16,
    height: 36,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
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
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const SignUpScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // const onPressSignUp = (): void => {
  //   emailSignUp(email, password);
  // };

  const onPressGoolgeSignUp = async (): Promise<void> => {
    await goolgeSignUp();
  };

  const onPressPhoneSignUp = async (): Promise<void> => {
    const result = await phoneSignUp(phoneNumber);
    if (result) {
      setConfirmResult(result);
      navigation.navigate('VerificationCode', { confirmResult: result });
    } else {
      console.log('error');
    }
  };

  const onPressFacebookSignIn = async (): Promise<void> => {
    const user = await facebookSignUp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>メールアドレス or 電話番号</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text: string): void => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        maxLength={50}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="done"
      />
      <Space size={16} />
      <Text style={styles.label}>パスワード（８ケタ以上）</Text>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text: string): void => setPassword(text)}
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        secureTextEntry
        returnKeyType="done"
      />
      <Space size={32} />
      <SubmitButton
        title="登録"
        onPress={(): void => emailSignUp(email, password)}
      />
      <Space size={32} />
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.subText}>or ソーシャルアカウントで登録</Text>
        <View style={styles.line} />
      </View>
      <Space size={32} />
      <SubmitButton title="Facebook Login" onPress={onPressFacebookSignIn} />
      <Space size={16} />
      <SubmitButton title="GoogleSignUp" onPress={onPressGoolgeSignUp} />
    </View>
  );
};

export default SignUpScreen;
