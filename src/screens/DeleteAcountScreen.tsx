import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import {
  subTextColor,
  fontSizeS,
  offWhite,
  fontSizeM,
  borderLightColor,
  softRed,
} from '../styles/Common';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { track, events } from '../utils/Analytics';
import ModalDeleteAcount from '../components/organisms/ModalDeleteAcount';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
  main: {
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: borderLightColor,
    backgroundColor: '#fff',
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    borderColor: borderLightColor,
  },
  delete: {
    color: softRed,
    fontSize: fontSizeM,
  },
});

const DeleteAcountScreen: NavigationStackScreenComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const onPressDelete = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser) return;
        if (!currentUser.email) {
          setIsLoading(true);
          await currentUser.delete();
        } else {
          setIsModal(true);
        }
      } catch (err) {
        setIsLoading(false);
        alert({ err });
      }
      setIsLoading(false);
      track(events.DELETED_USER);
    };
    f();
  }, []);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser || !currentUser.email) return;
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        setIsLoading(true);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.delete();
      } catch (err) {
        setIsLoading(false);
        const errorCode = err.code;
        if (errorCode === 'auth/wrong-password') {
          setErrorPassword(I18n.t('errorMessage.wrongPassword'));
        } else {
          setErrorPassword('');
          alert({ err });
        }
      }
      track(events.DELETED_USER);
      setIsLoading(false);
    };
    f();
  }, [password]);

  const onBlurPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  const onPressClose = useCallback(() => {
    setIsModal(false);
    setPassword('');
    setErrorPassword('');
  }, []);

  return (
    <View style={styles.container}>
      <ModalDeleteAcount
        visible={isModal}
        isLoading={isLoading}
        password={password}
        errorMessage={errorPassword}
        onChangeText={(txt: string): void => setPassword(txt)}
        onPressSubmit={onPressSubmit}
        onBlur={onBlurPassword}
        onPressClose={onPressClose}
      />
      <View style={styles.main}>
        <Text style={styles.text}>{I18n.t('deleteAcount.text')}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          <Text style={styles.delete}>{I18n.t('deleteAcount.withdrawal')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

DeleteAcountScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('deleteAcount.headerTitle'),
  };
};

export default DeleteAcountScreen;
