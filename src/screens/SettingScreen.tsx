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
import { alert } from '../utils/ErrorAlert';
import { getVersionText } from '../utils/common';

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
  versionText: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'center',
  },
});

/**
 * 設定画面ページ
 */
const SettingScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { currentUser } = firebase.auth();

  const onPressLogout = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        if (currentUser && currentUser.email) {
          await firebase.auth().signOut();
        } else {
          Alert.alert('', I18n.t('errorMessage.cantLogout'));
        }
        track(events.SIGN_OUT);
      } catch (err) {
        alert({ err });
      }
    };
    f();
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('setting.title')}</Text>
      <OptionItem
        title={I18n.t('setting.notice')}
        onPress={(): void => {
          navigation.navigate('Notice');
        }}
      />
      {currentUser ? (
        <OptionItem
          title={I18n.t('myDiaryListMenu.reviewList')}
          onPress={(): void => {
            navigation.navigate('ReviewList', { uid: currentUser.uid });
          }}
        />
      ) : null}
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
        title={I18n.t('setting.inquiry')}
        onPress={(): void => {
          navigation.navigate('Inquiry');
        }}
      />
      <OptionItem
        title={I18n.t('setting.tutorial')}
        onPress={(): void => {
          navigation.navigate('TutorialList');
        }}
      />
      <Space size={16} />
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
      <Space size={16} />
      <Text style={styles.versionText}>{getVersionText()}</Text>
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
