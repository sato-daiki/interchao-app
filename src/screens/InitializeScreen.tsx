import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, linkBlue, primaryColor } from '../styles/Common';
import { LogoVercitacl } from '../images';
import { setLogEvent, events } from '../utils/Analytics';

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
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingTop: 16,
  },
  linkText: {
    color: linkBlue,
  },
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const InitializeScreen: NavigationStackScreenComponent = ({ navigation }) => {
  useEffect((): void => {
    setLogEvent(events.OPENED_INITIALIZE);
  }, []);

  const onPressSignIn = (): void => {
    navigation.navigate('SignIn');
  };

  const onPressSignUp = (): void => {
    navigation.navigate('SelectLanguage');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.contaner}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={LogoVercitacl} />
        </View>
        <View style={styles.footer}>
          <SubmitButton title="はじめる" onPress={onPressSignUp} />
          <Text style={styles.text}>
            アカウントをお持ちの方は
            <Text style={styles.linkText} onPress={onPressSignIn}>
              こちら
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

InitializeScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default InitializeScreen;
