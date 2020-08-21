import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import '@expo/match-media';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import { useMediaQuery } from 'react-responsive';
import { maxWindowWidth, minDeviceWidth } from '../styles/Common';
import { track, events } from '../utils/Analytics';
import { Fotter, Header } from '../components/web/molecules';
import FirstView from '../components/web/organisms/FirstView';
import WhatIs from '../components/web/organisms/WhatIs';
import AppDownload from '../components/web/molecules/AppDownload';
import WhyIs from '../components/web/organisms/WhyIs';
import Reason from '../components/web/organisms/Reason';
import Correct from '../components/web/organisms/Correct';
import Start from '../components/web/organisms/Start';
import Example from '../components/web/organisms/Example';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const InitializeScreen: NavigationStackScreenComponent = ({ navigation }) => {
  useEffect((): void => {
    track(events.OPENED_INITIALIZE);
  }, []);

  // PCのサイズの時（ブラウザの横サイズ）
  const isPcWidth = useMediaQuery({ minWidth: maxWindowWidth });

  // 端末自体がスマホの時
  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth,
  });

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <Header
            onPress={(): void => {
              navigation.navigate('Initialize');
            }}
          />
          <FirstView isPcWidth={isPcWidth} navigation={navigation} />
          {isDesktopOrLaptopDevice ? null : <AppDownload />}
          <WhatIs isPcWidth={isPcWidth} />
          <WhyIs isPcWidth={isPcWidth} />
          <Reason isPcWidth={isPcWidth} />
          <Correct isPcWidth={isPcWidth} />
          <Example isPcWidth={isPcWidth} />
          <Start isPcWidth={isPcWidth} />
          {isDesktopOrLaptopDevice ? null : <AppDownload />}
          <Fotter />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

InitializeScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default InitializeScreen;
