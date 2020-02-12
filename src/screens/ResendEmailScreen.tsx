import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
} from '../styles/Common';
import Space from '../components/atoms/Space';

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
});

const ResendEmailScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [email, setEmail] = useState('');

  const onPressResend = (): void => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.label}>メールアドレス</Text>
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
      <Space size={32} />
      <SubmitButton title="確認メールの送信" onPress={onPressResend} />
    </View>
  );
};

export default ResendEmailScreen;
