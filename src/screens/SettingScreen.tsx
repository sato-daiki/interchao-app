import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
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
import { Space, Hoverable } from '../components/atoms';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import { appShare, getVersionText } from '../utils/common';
import { ModalConfirm } from '../components/organisms';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../navigations/MyPageTabNavigator';

import { Profile, User } from '../types';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  signOut: () => void;
}

type SettingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'Setting'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: SettingNavigationProp;
} & DispatchProps &
  Props;

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
const SettingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  profile,
  signOut,
}) => {
  const { currentUser } = firebase.auth();
  const [isModalError, setIsModalError] = useState(false);

  const onPressLogout = useCallback(async (): Promise<void> => {
    try {
      if (currentUser && currentUser.email) {
        await firebase.auth().signOut();
      } else {
        setIsModalError(true);
        return;
      }
      track(events.SIGN_OUT);
      signOut();
    } catch (err) {
      alert({ err });
    }
  }, [currentUser, signOut]);

  const onPressReminder = useCallback(() => {
    if (user.reminder) {
      navigation.navigate('ReminderSelectTimeSetting');
    } else {
      navigation.navigate('ReminderInitialSetting');
    }
  }, [navigation, user.reminder]);

  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.confirmation')}
        message={I18n.t('errorMessage.cantLogout')}
        mainButtonText={I18n.t('common.close')}
        onPressMain={(): void => setIsModalError(false)}
      />
      <Text style={styles.title}>{I18n.t('setting.title')}</Text>
      {Platform.OS !== 'web' && (
        <OptionItem
          title={I18n.t('setting.reminder')}
          onPress={onPressReminder}
        />
      )}
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
      <OptionItem
        title={I18n.t('setting.about')}
        onPress={(): void => {
          navigation.navigate('ModalAbout', { screen: 'About' });
        }}
      />
      {Platform.OS === 'web' ? null : (
        <OptionItem
          title={I18n.t('sns.app')}
          onPress={(): Promise<void> => appShare(profile.nativeLanguage)}
        />
      )}
      <Space size={16} />
      <OptionItem
        title={I18n.t('setting.deleteAcount')}
        onPress={(): void => {
          navigation.navigate('DeleteAcount');
        }}
      />
      <Space size={16} />
      <Hoverable style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logout}>{I18n.t('setting.logout')}</Text>
      </Hoverable>
      <Space size={16} />
      <Text style={styles.versionText}>{getVersionText()}</Text>
    </View>
  );
};

export default SettingScreen;
