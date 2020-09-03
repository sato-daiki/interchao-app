import React, { useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, linkBlue, primaryColor } from '../styles/Common';
import { LogoVercitacl } from '../images';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import { User } from '../types';
import { getExpoPushToken } from '../utils/Notification';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 254,
  },
  contaner: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 32,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  linkText: {
    color: linkBlue,
    fontSize: fontSizeM,
  },
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const InitializeNativeScreen: ScreenType = ({ user, setUser, navigation }) => {
  useEffect((): void => {
    const f = async (): Promise<void> => {
      track(events.OPENED_INITIALIZE);
      const expoPushToken = await getExpoPushToken();
      if (expoPushToken) {
        setUser({ ...user, expoPushToken });
      }
    };
    f();
  }, [setUser, user]);

  const onPressSignIn = useCallback((): void => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const onPressSignUp = useCallback((): void => {
    navigation.navigate('SelectLanguage');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.contaner}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={LogoVercitacl} />
        </View>
        <View style={styles.footer}>
          <SubmitButton
            title={I18n.t('initialize.start')}
            onPress={onPressSignUp}
          />
          <View style={styles.row}>
            <Text style={styles.text}>{I18n.t('initialize.acount')}</Text>
            <TouchableOpacity onPress={onPressSignIn}>
              <Text style={styles.linkText}>{I18n.t('initialize.link')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

InitializeNativeScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default InitializeNativeScreen;
