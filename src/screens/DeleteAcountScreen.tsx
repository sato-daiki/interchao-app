import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
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
    paddingLeft: 16,
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

const DeleteAcountScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const onPressDelete = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser.email) {
          setIsLoading(true);
          await currentUser!.delete();
        } else {
          setIsModal(true);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert(' エラー', 'ネットワークエラーです');
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
      } catch (error) {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          setErrorPassword('パスワードが違います');
        } else {
          setErrorPassword('');
          Alert.alert('', 'ネットワークエラーです', errorMessage);
        }
      }
      track(events.DELETED_USER);
      setIsLoading(false);
    };
    f();
  }, [password]);

  const onEndEditingPassword = useCallback(() => {
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
        onEndEditing={onEndEditingPassword}
        onPressClose={onPressClose}
      />
      <View style={styles.main}>
        <Text style={styles.text}>
          退会すると投稿した日記の情報が完全に消去され、復元することはできません。
          {'\n'}
          {'\n'}
          それでも退会を希望する方は下のボタンから退会してください。
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          <Text style={styles.delete}>退会する</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

DeleteAcountScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '退会について',
  };
};

export default DeleteAcountScreen;
