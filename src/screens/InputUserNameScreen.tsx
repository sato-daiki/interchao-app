import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
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
import {
  checkDuplicatedUserName,
  checkTypeUserName,
  checkInitialUserName,
} from '../utils/profile';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import { AuthStackParamList } from '../navigations/AuthNavigator';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => void;
}

type ScreenType = StackScreenProps<AuthStackParamList, 'InputUserName'> &
  Props &
  DispatchProps;

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

const InputUserNameScreen: React.FC<ScreenType> = ({
  navigation,
  profile,
  setProfile,
}) => {
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
          setErrorMessage(I18n.t('errorMessage.invalidUserName'));
          return;
        }

        const initialChecked = checkInitialUserName(text);
        if (!initialChecked) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage.initialUserName'));
          return;
        }

        setIsUserNameLoading(true);
        const resDuplicated = await checkDuplicatedUserName(text);
        if (!resDuplicated) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage.userNameAlreadyInUse'));
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
      <Text style={styles.title}>{I18n.t('inputUserName.title')}</Text>
      <Text style={styles.subText}>{I18n.t('inputUserName.subText')}</Text>
      <CheckTextInput
        autoFocus
        value={userName}
        onChangeText={onChangeText}
        maxLength={20}
        placeholder="username"
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
        title={I18n.t('common.next')}
        onPress={onPressNext}
      />
    </View>
  );
};

export default InputUserNameScreen;
