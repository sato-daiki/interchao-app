import React, { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import firebase from '../configs/firebase';
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

  const onPressLogout = useCallback(() => {}, []);

  const onPressDelete = async () => {
    // const f = async (): Promise<void> => {
    await firebase.auth().currentUser.delete();
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    // };
    // f();
    // }, []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>基本設定</Text>
      <OptionItem title="プレミアムサービス" onPress={onPressPremium} />
      <OptionItem title="通知" onPress={onPressNotice} />
      <OptionItem
        title="お気に入りユーザ一覧"
        onPress={onPressFavoriteUserList}
      />
      <Space size={16} />
      <OptionItem title="プライバシーポリシー" onPress={onPressPrivacy} />
      <OptionItem title="運営" onPress={onPressManagement} />
      <Space size={16} />
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logout}>ログアウト</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={onPressDelete}>
        <Text style={styles.logout}>退会</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
