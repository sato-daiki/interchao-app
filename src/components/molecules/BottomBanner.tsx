import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const styles = StyleSheet.create({
  adMobBanner: {
    alignItems: 'center',
  },
});

const IOS_AD_UNIT_ID = 'ca-app-pub-0770181536572634/3644229404';
const ANDROID_AD_UNIT_ID = 'ca-app-pub-0770181536572634/3113100884';

const BottomBanner: React.FC = () => {
  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <View style={styles.adMobBanner}>
      {/* <BannerAd
        unitId={Platform.OS === 'ios' ? IOS_AD_UNIT_ID : ANDROID_AD_UNIT_ID}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
    </View>
  );
};

export default BottomBanner;
