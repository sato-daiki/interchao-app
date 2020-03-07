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
import { setLogEvent, events } from '../utils/Analytics';

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

  const onPressDelete = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        await firebase.auth().currentUser!.delete();
        setLogEvent(events.DELETED_USER);
      } catch (error) {
        Alert.alert(' エラー', 'ネットワークエラーです');
      }
    };
    f();
  }, []);

  const onPressLogout = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        await firebase.auth().signOut();
        setLogEvent(events.SIGN_OUT);
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

SettingScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '設定',
  };
};

export default SettingScreen;
