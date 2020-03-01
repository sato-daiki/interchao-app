import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, linkBlue, primaryColor } from '../styles/Common';
import { Zebbu } from '../images';

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
    height: 200,
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
  const onPressSignIn = (): void => {
    navigation.navigate('SignIn');
  };

  const onPressSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.contaner}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={Zebbu} />
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
  header: null,
});

export default InitializeScreen;
