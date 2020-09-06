import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import {
  checkDuplicatedUserName,
  checkTypeUserName,
  checkInitialUserName,
} from '../utils/profile';
import { CheckTextInput } from '../components/molecules';
import { HeaderRight } from '../components/atoms';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile } from '../types';
import I18n from '../utils/I18n';
import DefaultLayout from '../components/template/DefaultLayout';
import {
  ModalEditMyProfileStackNavigationProp,
  ModalEditMyProfileStackParamList,
} from '../navigations/ModalNavigator';

export interface Props {
  profile: Profile;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalEditMyProfileStackParamList, 'EditUserName'>,
  ModalEditMyProfileStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<ModalEditMyProfileStackParamList, 'EditUserName'>;
} & Props;

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

const EditUserNameScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  profile,
}): JSX.Element => {
  const [userName, setUserName] = useState(route.params.userName);
  const [isUserNameLoading, setIsUserNameLoading] = useState(false);
  const [isUserNameCheckOk, setIsUserNameCheckOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (userName === '') return;
      if (!route.params) return;

      if (profile.userName !== userName) {
        const typeChecked = checkTypeUserName(userName);
        const initialChecked = checkInitialUserName(userName);
        const resDuplicated = await checkDuplicatedUserName(userName);

        if (!initialChecked || !typeChecked || !resDuplicated) {
          // 変更があった時かつ、他のユーザと重複している場合
          return;
        }
      }
      route.params.setUserName(userName);
      navigation.goBack();
    };
    f();
  }, [navigation, profile.userName, route.params, userName]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): JSX.Element => (
        <HeaderRight text={I18n.t('common.done')} onPress={onPressSubmit} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const onChangeText = useCallback(
    text => {
      const f = async (): Promise<void> => {
        setUserName(text);
        if (text === '') {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage.emptyUserName'));
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
        if (!resDuplicated && text !== profile.userName) {
          setIsUserNameLoading(false);
          setIsUserNameCheckOk(false);
          setErrorMessage(I18n.t('errorMessage.userNameAlreadyInUse'));
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
    <DefaultLayout lSize>
      <View style={styles.container}>
        <Text style={styles.label}>{I18n.t('editUserName.userName')}</Text>
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
      </View>
    </DefaultLayout>
  );
};

export default EditUserNameScreen;
