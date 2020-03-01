import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { User } from '../types/user';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  fontSizeM,
  primaryColor,
  fontSizeL,
  subTextColor,
} from '../styles/Common';
import Space from '../components/atoms/Space';
import { CheckTextInput } from '../components/molecules';

interface OwnProps {
  navigation: NavigationStackProp;
}

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

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
});

const InputUserNameScreen: React.FC<Props & DispatchProps & OwnProps> = ({
  user,
  navigation,
  setUser,
}): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [isUserNameLoading, setIsUserNameLoading] = useState(false);
  const [isUserNameCheckOk, setIsUserNameCheckOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onEndEditing = () => {};

  const onPressRegist = async (): Promise<void> => {};

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>ユーザーネームを入力してください</Text>
      <Text style={styles.subText}>このユーザネームはいつでも変更できます</Text>
      <CheckTextInput
        value={userName}
        onChangeText={(text: string): void => setUserName(text)}
        onEndEditing={onEndEditing}
        maxLength={50}
        placeholder="zebra"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        isLoading={isUserNameLoading}
        isCheckOk={isUserNameCheckOk}
        errorMessage={errorMessage}
      />
      <Space size={32} />
      <SubmitButton title="登録" onPress={onPressRegist} />
    </View>
  );
};

export default InputUserNameScreen;
