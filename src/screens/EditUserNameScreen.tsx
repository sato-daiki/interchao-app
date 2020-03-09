import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { checkUserName } from '../utils/auth';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import { HeaderText } from '../components/atoms';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile } from '../types';

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
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

const EditUserNameScreen: ScreenType = ({
  navigation,
  profile,
}): JSX.Element => {
  const [userName, setUserName] = useState(navigation.state.params!.userName);
  const [isUserNameLoading, setIsUserNameLoading] = useState(false);
  const [isUserNameCheckOk, setIsUserNameCheckOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (profile.userName !== userName) {
        const duplicated = await checkUserName(userName);
        if (duplicated) {
          // 変更があった時かつ、他のユーザと重複している場合
          return;
        }
      }
      navigation.state.params!.setUserName(userName);
      navigation.goBack(null);
    };
    f();
  }, [navigation, profile.userName, userName]);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressSubmit });
  }, [userName]);

  const onChangeText = useCallback(
    text => {
      const f = async (): Promise<void> => {
        setIsUserNameLoading(true);
        setUserName(text);
        const duplicated = await checkUserName(text);
        if (duplicated && text === profile.userName) {
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
    [setUserName, userName]
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ユーザーネーム</Text>
      <CheckTextInput
        value={userName}
        onChangeText={onChangeText}
        maxLength={50}
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
    </View>
  );
};

EditUserNameScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: 'ユーザーネーム',
    headerRight: (): JSX.Element => (
      <HeaderText title="完了" onPress={onPressSubmit} />
    ),
  };
};

export default EditUserNameScreen;
