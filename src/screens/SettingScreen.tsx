import React, { useCallback } from 'react';
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
  primaryColor,
  fontSizeM,
  borderLightColor,
} from '../styles/Common';
import { OptionItem } from '../components/molecules';
import { Space } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { track, events } from '../utils/Analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
  title: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingLeft: 16,
    paddingBottom: 8,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    borderBottomColor: borderLightColor,
  },
  logout: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

/**
 * 設定画面ページ
 */
const SettingScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { currentUser } = firebase.auth();

  const onPressPremium = useCallback(() => {
    navigation.navigate('Premium');
  }, [navigation]);

  const onPressNotice = useCallback(() => {
    navigation.navigate('Notice');
  }, [navigation]);

  const onPressFavoriteUserList = useCallback(() => {
    navigation.navigate('FavoriteUserList');
  }, [navigation]);

  const onPressPrivacy = useCallback(() => {
    navigation.navigate('Privacy');
  }, [navigation]);

  const onPressManagement = useCallback(() => {
    navigation.navigate('Management');
  }, [navigation]);

  const onPressDelete = useCallback(() => {
    navigation.navigate('DeleteAcount');
  }, [navigation]);

  const onPressLogout = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        if (currentUser && currentUser.email) {
          await firebase.auth().signOut();
        } else {
          Alert.alert(
            '',
            'メールアドレスが登録されていないため、ログアウトできません。'
          );
        }
        track(events.SIGN_OUT);
      } catch (error) {
        Alert.alert(' エラー', 'ネットワークエラーです');
      }
    };
    f();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>基本設定</Text>
      <OptionItem title="プレミアムサービス" onPress={onPressPremium} />
      <OptionItem title="通知" onPress={onPressNotice} />
      {currentUser && currentUser.email ? (
        <>
          <OptionItem
            title="メールアドレスの変更"
            onPress={(): boolean => navigation.navigate('EditEmail')}
          />
          <OptionItem
            title="パスワードの変更"
            onPress={(): boolean => navigation.navigate('EditPassword')}
          />
        </>
      ) : (
        <OptionItem
          title="メールアドレス/パスワードの登録"
          onPress={(): boolean => navigation.navigate('RegisterEmailPassword')}
        />
      )}
      <OptionItem
        title="お気に入りユーザ一覧"
        onPress={onPressFavoriteUserList}
      />
      <Space size={16} />
      <OptionItem title="プライバシーポリシー" onPress={onPressPrivacy} />
      <OptionItem title="運営" onPress={onPressManagement} />
      <OptionItem title="退会について" onPress={onPressDelete} />
      <Space size={16} />
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logout}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

SettingScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '設定',
  };
};

export default SettingScreen;
