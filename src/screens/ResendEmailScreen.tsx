import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, primaryColor } from '../styles/Common';
import Space from '../components/atoms/Space';
import { CheckTextInput } from '../components/molecules';

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

const ResendEmailScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [email, setEmail] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');

  const onEndEditingEmail = (): void => {};

  const onPressResend = (): void => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.label}>メールアドレス</Text>
      <CheckTextInput
        value={email}
        onChangeText={(text: string): void => setEmail(text)}
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
      <Space size={32} />
      <SubmitButton title="確認メールの送信" onPress={onPressResend} />
    </View>
  );
};

export default ResendEmailScreen;
