import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import '@expo/match-media';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import { useMediaQuery } from 'react-responsive';
import { maxWindowWidth, minDeviceWidth } from '../styles/Common';
import { track, events } from '../utils/Analytics';
import {
  Header,
  FirstView,
  WhyIs,
  WhatIs,
  Reason,
  Correct,
  Example,
  Start,
  Fotter,
} from '../components/web';

const styles = StyleSheet.create({
  container: {
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
    <ScrollView>
      <View style={styles.container}>
        <Header
          onPress={(): void => {
            navigation.navigate('Initialize');
          }}
        />
        <FirstView isPcWidth={isPcWidth} navigation={navigation} />
        <WhatIs isPcWidth={isPcWidth} />
        <WhyIs isPcWidth={isPcWidth} />
        <Reason isPcWidth={isPcWidth} />
        <Correct isPcWidth={isPcWidth} />
        <Example isPcWidth={isPcWidth} />
        <Start isPcWidth={isPcWidth} />
        <Fotter navigation={navigation} />
      </View>
    </ScrollView>
  );
};

InitializeScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default InitializeScreen;
