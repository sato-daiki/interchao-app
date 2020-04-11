import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  checkDuplicatedUserName,
  checkTypeUserName,
  checkInitialUserName,
} from '../utils/profile';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import { HeaderText } from '../components/atoms';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile } from '../types';
import I18n from '../utils/I18n';

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
      if (userName === '') return;
      if (!navigation.state.params) return;

      if (profile.userName !== userName) {
        const typeChecked = checkTypeUserName(userName);
        const initialChecked = checkInitialUserName(userName);
        const resDuplicated = await checkDuplicatedUserName(userName);

        if (!initialChecked || !typeChecked || !resDuplicated) {
          // 変更があった時かつ、他のユーザと重複している場合
          return;
        }
      }
      navigation.state.params.setUserName(userName);
      navigation.goBack(null);
    };
    f();
  }, [navigation, profile.userName, userName]);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const onChangeText = useCallback(
    text => {
      const f = async (): Promise<void> => {
        setUserName(text);
        if (text === '') {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage/emptyUserName'));
          return;
        }

        const typeChecked = checkTypeUserName(text);
        if (!typeChecked) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage/invalidUserName'));
          return;
        }

        const initialChecked = checkInitialUserName(text);
        if (!initialChecked) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage/initialUserName'));
          return;
        }

        setIsUserNameLoading(true);
        const resDuplicated = await checkDuplicatedUserName(text);
        if (!resDuplicated && text !== profile.userName) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage/userNameAlreadyInUse'));
          return;
        }
        setIsUserNameLoading(false);
        setIsUserNameCheckOk(true);
        setErrorMessage('');
      };
      f();
    },
    [profile.userName]
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{I18n.t('editUserName.userName')}</Text>
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
    title: I18n.t('editUserName.headerTitle'),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.done')} onPress={onPressSubmit} />
    ),
  };
};

export default EditUserNameScreen;
