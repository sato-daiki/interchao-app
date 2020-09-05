import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import {
  subTextColor,
  fontSizeS,
  offWhite,
  fontSizeM,
  borderLightColor,
  softRed,
} from '../styles/Common';
import { track, events } from '../utils/Analytics';
import ModalDeleteAcount from '../components/organisms/ModalDeleteAcount';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '../navigations/MyPageTabNavigator';

type DeleteAcountNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'DeleteAcount'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: DeleteAcountNavigationProp;
};

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

const DeleteAcountScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const afterDeleteUser = useCallback(() => {
    // TODO reduxの削除
    navigation.navigate('Initialize');
  }, [navigation]);

  const onPressDelete1 = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
          afterDeleteUser();
          return;
        }
        if (!currentUser.email) {
          // メールアドレスを登録していないユーザの場合→そのまま削除
          setIsLoading(true);
          await currentUser.delete();
          afterDeleteUser();
        } else {
          // メールアドレスを登録しているユーザの場合→パスワード入力に切り替える
          setIsPasswordInput(true);
        }
      } catch (err) {
        setIsLoading(false);
        alert({ err });
      }
      setIsLoading(false);
      track(events.DELETED_USER);
    };
    f();
  }, [afterDeleteUser]);

  const onPressDelete2 = useCallback(() => {
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
        afterDeleteUser();
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
  }, [afterDeleteUser, password]);

  const onBlurPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  const onPressClose = useCallback(() => {
    setIsPasswordInput(false);
    setIsModal(false);
    setPassword('');
    setErrorPassword('');
  }, []);

  return (
    <View style={styles.container}>
      <ModalDeleteAcount
        visible={isModal}
        isPasswordInput={isPasswordInput}
        isLoading={isLoading}
        password={password}
        errorMessage={errorPassword}
        onChangeText={(txt: string): void => setPassword(txt)}
        onPressDelete1={onPressDelete1}
        onPressDelete2={onPressDelete2}
        onBlur={onBlurPassword}
        onPressClose={onPressClose}
      />
      <View style={styles.main}>
        <Text style={styles.text}>{I18n.t('deleteAcount.text')}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(): void => setIsModal(true)}
        >
          <Text style={styles.delete}>{I18n.t('deleteAcount.withdrawal')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAcountScreen;
