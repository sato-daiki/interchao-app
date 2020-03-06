import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
} from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  fontSizeM,
  primaryColor,
  fontSizeL,
  subTextColor,
} from '../styles/Common';
import Space from '../components/atoms/Space';
import { CheckTextInput } from '../components/molecules';
import { Profile } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { checkUserName } from '../libs/auth';

interface Props {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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

const InputUserNameScreen: ScreenType = ({
  navigation,
  profile,
  setProfile,
}): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [isUserNameLoading, setIsUserNameLoading] = useState(false);
  const [isUserNameCheckOk, setIsUserNameCheckOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeText = useCallback(
    text => {
      const f = async (): Promise<void> => {
        setIsUserNameLoading(true);
        setUserName(text);
        const duplicated = await checkUserName(text);
        if (duplicated) {
          setIsUserNameCheckOk(false);
          setErrorMessage(
            'すでにこのユーザーネームを使用しているユーザーがいます'
          );
        } else {
          setIsUserNameCheckOk(true);
          setErrorMessage('');
        }
        setIsUserNameLoading(false);
      };
      f();
    },
    [checkUserName]
  );

  const onPressNext = async (): Promise<void> => {
    const duplicated = await checkUserName(userName);
    if (duplicated) {
      return;
    }
    setProfile({
      ...profile,
      userName,
    });
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>ユーザーネームを入力してください</Text>
      <Text style={styles.subText}>このユーザネームはいつでも変更できます</Text>
      <CheckTextInput
        value={userName}
        onChangeText={onChangeText}
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
      <SubmitButton
        disable={!isUserNameCheckOk}
        title="次へ"
        onPress={onPressNext}
      />
    </View>
  );
};

InputUserNameScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: 'ユーザーネーム登録',
  };
};

export default InputUserNameScreen;
