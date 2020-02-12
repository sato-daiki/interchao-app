import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
  fontSizeL,
  subTextColor,
} from '../styles/Common';
import Space from '../components/atoms/Space';

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
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

const InputUserNameScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [userName, setUserName] = useState('ja');

  const onPressRegist = (): void => {};

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>ユーザーネームを入力してください</Text>
      <Text style={styles.subText}>このユーザネームはいつでも変更できます</Text>
      <TextInput
        style={styles.textInput}
        value={userName}
        onChangeText={(text: string): void => setUserName(text)}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        maxLength={50}
        placeholder="zebra"
        keyboardType="default"
        returnKeyType="done"
      />

      <Space size={32} />
      <SubmitButton title="登録" onPress={onPressRegist} />
    </View>
  );
};

export default InputUserNameScreen;
