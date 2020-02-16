import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, linkBlue, primaryColor } from '../styles/Common';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  contaner: {
    flex: 1,
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
const InitializeScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const onPressSignIn = (): void => {
    navigation.navigate('SignIn');
  };

  const onPressSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.contaner}>
        <SubmitButton title="はじめる" onPress={onPressSignUp} />
        <Text style={styles.text}>
          アカウントをお持ちの方は
          <Text style={styles.linkText} onPress={onPressSignIn}>
            こちら
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InitializeScreen;
