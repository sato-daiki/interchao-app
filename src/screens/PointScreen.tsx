import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, Platform } from 'react-native';
import { AdMobRewarded, setTestDeviceIDAsync } from 'expo-ads-admob';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Profile, User } from '../types';
import I18n from '../utils/I18n';
import {
  PointTabStackParamList,
  PointTabNavigationProp,
} from '../navigations/PointTabNavigator';
import { addPoint } from '@/utils/point';
import { SubmitButton, DarkLoadingModal } from '@/components/atoms';
import ModalAdPointGet from '@/components/organisms/ModalAdPointGet';

export interface Props {
  profile: Profile;
  user: User;
}

type PointNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PointTabStackParamList, 'Point'>,
  PointTabNavigationProp
>;

type ScreenType = {
  navigation: PointNavigationProp;
} & Props;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
});

const IOS_AD_UNIT_ID = 'ca-app-pub-0770181536572634/8533486206';
const ANDROID_AD_UNIT_ID = 'ca-app-pub-0770181536572634/7603547919';

const PointScreen: React.FC<ScreenType> = ({ navigation, profile, user }) => {
  const [isModalAdPointGet, setIsModalAdPointGet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rewardedVideoUserDidEarnReward = useCallback(async () => {
    // 広告をみた人が実行できる処理
    await addPoint(user.uid);
    setIsModalAdPointGet(true);
  }, [user.uid]);

  const rewardedVideoDidFailToLoad = useCallback(() => {
    Alert.alert(
      I18n.t(''),
      I18n.t(
        '動画再生においてエラーが発生しました。動画を終了してアンケートに戻ります'
      ),
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }, []);

  useEffect(() => {
    AdMobRewarded.addEventListener(
      'rewardedVideoUserDidEarnReward',
      rewardedVideoUserDidEarnReward
    );

    AdMobRewarded.addEventListener(
      'rewardedVideoDidFailToLoad',
      rewardedVideoDidFailToLoad
    );

    return () => {
      AdMobRewarded.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressShowAdReward = useCallback(async () => {
    console.log('onPressShowAdReward');
    setIsLoading(true);
    try {
      await setTestDeviceIDAsync('EMULATOR');
      await AdMobRewarded.setAdUnitID(
        Platform.OS === 'ios' ? IOS_AD_UNIT_ID : ANDROID_AD_UNIT_ID
      );
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    } catch (err) {
      console.log('err', err);

      // logSentry(err, 'AdRewardでエラー');
    }
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <DarkLoadingModal visible={isLoading} text="動画広告を読み込んでいます" />
      <SubmitButton title="test" onPress={onPressShowAdReward} />
      <ModalAdPointGet
        visible={isModalAdPointGet}
        points={10}
        getPoints={100}
        onPressClose={(): void => setIsModalAdPointGet(false)}
      />
      <View style={styles.container} />
    </SafeAreaView>
  );
};

export default PointScreen;
