import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { StackScreenProps } from '@react-navigation/stack';
import { maxLayoutChange } from '../styles/Common';
import { track, events } from '../utils/Analytics';
import { AppDownload, Fotter, Header } from '../components/web/molecules';
import FirstView from '../components/web/organisms/FirstView';
import WhatIs from '../components/web/organisms/WhatIs';
import WhyIs from '../components/web/organisms/WhyIs';
import Reason from '../components/web/organisms/Reason';
import Correct from '../components/web/organisms/Correct';
import Start from '../components/web/organisms/Start';
import Example from '../components/web/organisms/Example';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type ScreenType = StackScreenProps<AuthStackParamList, 'Initialize'>;

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
const InitializeWebScreen: React.FC<ScreenType> = ({ navigation }) => {
  useEffect((): void => {
    track(events.OPENED_INITIALIZE);
  }, []);

  // PCのサイズの時（ブラウザの横サイズ）
  const isMaxLayoutChange = useMediaQuery({ minWidth: maxLayoutChange });

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const isMobileDevice = useMediaQuery({
    maxDeviceWidth: 767,
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
          <FirstView
            onPressStart={(): void => {
              navigation.navigate('SelectLanguage');
            }}
            onPressLogin={(): void => {
              navigation.navigate('SignIn');
            }}
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          {isTabletOrMobileDevice ? <AppDownload isWhite /> : null}
          <WhatIs
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          <WhyIs
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          <Reason isMaxLayoutChange={isMaxLayoutChange} />
          <Correct
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          <Example
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          <Start
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          {isTabletOrMobileDevice ? <AppDownload isWhite={false} /> : null}
          <Fotter />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default InitializeWebScreen;
