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
import I18n from '../utils/I18n';

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

  const onPressPrivacy = useCallback(() => {
    navigation.navigate('Privacy');
  }, [navigation]);

  const onPressManagement = useCallback(() => {
    navigation.navigate('Management');
  }, [navigation]);

  const onPressLogout = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        if (currentUser && currentUser.email) {
          await firebase.auth().signOut();
        } else {
          Alert.alert('', I18n.t('errorMessage.cantLogout'));
        }
        track(events.SIGN_OUT);
      } catch (error) {
        Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.other'));
      }
    };
    f();
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('setting.title')}</Text>
      {/* <OptionItem title="プレミアムサービス" onPress={onPressPremium} /> */}
      <OptionItem
        title={I18n.t('setting.notice')}
        onPress={(): void => {
          navigation.navigate('Notice');
        }}
      />
      {currentUser && currentUser.email ? (
        <>
          <OptionItem
            title={I18n.t('setting.editEmail')}
            onPress={(): void => {
              navigation.navigate('EditEmail');
            }}
          />
          <OptionItem
            title={I18n.t('setting.editPassword')}
            onPress={(): void => {
              navigation.navigate('EditPassword');
            }}
          />
        </>
      ) : (
        <OptionItem
          title={I18n.t('setting.registerEmailPassword')}
          onPress={(): void => {
            navigation.navigate('RegisterEmailPassword');
          }}
        />
      )}
      <OptionItem
        title={I18n.t('setting.tutorial')}
        onPress={(): void => {
          navigation.navigate('TutorialList');
        }}
      />
      {/* <OptionItem
        title="お気に入りユーザ一覧"
        onPress={onPressFavoriteUserList}
      /> */}
      <Space size={16} />
      <OptionItem title={I18n.t('setting.privacy')} onPress={onPressPrivacy} />
      <OptionItem
        title={I18n.t('setting.management')}
        onPress={onPressManagement}
      />
      <OptionItem
        title={I18n.t('setting.deleteAcount')}
        onPress={(): void => {
          navigation.navigate('DeleteAcount');
        }}
      />
      <Space size={16} />
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logout}>{I18n.t('setting.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

SettingScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('setting.headerTitle'),
  };
};

export default SettingScreen;
