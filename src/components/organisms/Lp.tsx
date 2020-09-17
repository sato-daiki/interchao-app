import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { maxLayoutChange } from '../../styles/Common';
import { track, events } from '../../utils/Analytics';
import { AppDownload, Fotter, Header } from '../web/molecules';
import FirstView from '../web/organisms/FirstView';
import WhatIs from '../web/organisms/WhatIs';
import WhyIs from '../web/organisms/WhyIs';
import Reason from '../web/organisms/Reason';
import Correct from '../web/organisms/Correct';
import Start from '../web/organisms/Start';
import Example from '../web/organisms/Example';

type Props = {
  isAbout: boolean;
  onPressHeader?: () => void;
  onPressStart?: () => void;
  onPressLogin?: () => void;
};

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
const Lp: React.FC<Props> = ({
  isAbout,
  onPressHeader,
  onPressStart,
  onPressLogin,
}) => {
  useEffect((): void => {
    track(events.OPENED_INITIALIZE);
  }, []);

  // PCのサイズの時（ブラウザの横サイズ）
  const isMaxLayoutChange = useMediaQuery({ minWidth: maxLayoutChange });

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const isMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <Header onPress={onPressHeader} />
          <FirstView
            isAbout={isAbout}
            onPressStart={onPressStart}
            onPressLogin={onPressLogin}
            isMaxLayoutChange={isMaxLayoutChange}
            isMobileDevice={isMobileDevice}
          />
          {isTabletOrMobileDevice && !isAbout ? <AppDownload isWhite /> : null}
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
          {isTabletOrMobileDevice && !isAbout ? (
            <AppDownload isWhite={false} />
          ) : null}
          <Fotter />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Lp;
