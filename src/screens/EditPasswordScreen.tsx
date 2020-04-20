import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { passwordInputError } from '../utils/InputCheck';
import firebase from '../constants/firebase';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import { Space, SubmitButton, LoadingModal } from '../components/atoms';
import { primaryColor, fontSizeM, linkBlue } from '../styles/Common';
import I18n from '../utils/I18n';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
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
  forgetText: {
    color: primaryColor,
    fontSize: fontSizeM,
    textAlign: 'center',
  },
  linkText: {
    color: linkBlue,
  },
});

const EditPasswordScreen: ScreenType = ({ navigation }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');

  const clearErrorMessage = (): void => {
    setErrorCurrentPassword('');
    setErrorNewPassword('');
  };

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      clearErrorMessage();
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser || !currentUser.email) return;
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );
        setIsLoading(true);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.updatePassword(newPassword);
        navigation.goBack();
      } catch (err) {
        passwordInputError(
          err,
          setErrorCurrentPassword,
          setErrorNewPassword,
          clearErrorMessage
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    f();
  }, [currentPassword, newPassword, navigation]);

  const onEndEditinCurrentPassword = useCallback(() => {
    setErrorCurrentPassword('');
  }, [setErrorCurrentPassword]);

  const onEndEditingNewPassword = useCallback(() => {
    setErrorNewPassword('');
  }, [setErrorNewPassword]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Text style={styles.label}>{I18n.t('editPassword.currentPassword')}</Text>
      <CheckTextInput
        value={currentPassword}
        onChangeText={(text: string): void => setCurrentPassword(text)}
        onEndEditing={onEndEditinCurrentPassword}
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        secureTextEntry
        returnKeyType="done"
        errorMessage={errorCurrentPassword}
      />
      <Space size={16} />
      <Text style={styles.label}>{I18n.t('editPassword.newPassword')}</Text>
      <CheckTextInput
        value={newPassword}
        onChangeText={(text: string): void => setNewPassword(text)}
        onEndEditing={onEndEditingNewPassword}
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        secureTextEntry
        returnKeyType="done"
        errorMessage={errorNewPassword}
      />
      <Space size={32} />
      <SubmitButton
        title={I18n.t('common.register')}
        onPress={onPressSubmit}
        disable={
          errorCurrentPassword !== '' ||
          errorNewPassword !== '' ||
          currentPassword === '' ||
          newPassword === ''
        }
      />
      <Space size={16} />
      <Text style={styles.forgetText}>
        {I18n.t('editPassword.forgetText')}
        <Text
          style={styles.linkText}
          onPress={(): void => {
            navigation.navigate('ForegetPassword');
          }}
        >
          {I18n.t('editPassword.link')}
        </Text>
      </Text>
    </View>
  );
};

EditPasswordScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('editPassword.headerTitle'),
  };
};

export default EditPasswordScreen;
