import React, { useState, useCallback, useEffect } from 'react';
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
import {
  checkDuplicatedUserName,
  checkTypeUserName,
  checkInitialUserName,
} from '../utils/profile';
import { track, events } from '../utils/Analytics';

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
  container: {
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

  useEffect((): void => {
    track(events.OPENED_INPUT_USER_NAME);
  }, []);

  const onChangeText = useCallback(
    text => {
      const f = async (): Promise<void> => {
        setUserName(text);
        if (text === '') {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage('');
          return;
        }

        const typeChecked = checkTypeUserName(text);
        if (!typeChecked) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(
            'ユーザーネームは半角英数字と_（アンダーバー）と.（ピリオド）以外使えません'
          );
          return;
        }

        const initialChecked = checkInitialUserName(text);
        if (!initialChecked) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage('先頭の文字は半角英数字以外使えません');
          return;
        }

        setIsUserNameLoading(true);
        const resDuplicated = await checkDuplicatedUserName(text);
        if (!resDuplicated) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(
            'すでにこのユーザーネームを使用しているユーザーがいます'
          );
          return;
        }

        setIsUserNameCheckOk(true);
        setErrorMessage('');
        setIsUserNameLoading(false);
      };
      f();
    },
    [setUserName]
  );

  const onPressNext = async (): Promise<void> => {
    const typeChecked = checkTypeUserName(userName);
    const initialChecked = checkInitialUserName(userName);
    const resDuplicated = await checkDuplicatedUserName(userName);

    if (!typeChecked || !initialChecked || !resDuplicated) {
      return;
    }
    setProfile({
      ...profile,
      userName,
    });
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ユーザーネームを入力してください</Text>
      <Text style={styles.subText}>このユーザネームはいつでも変更できます</Text>
      <CheckTextInput
        value={userName}
        onChangeText={onChangeText}
        maxLength={20}
        placeholder="zebra"
        keyboardType="email-address"
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
