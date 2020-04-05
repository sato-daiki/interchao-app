import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';

import { offWhite } from '../styles/Common';
import { OptionItem } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import TutorialCorrecting from '../components/organisms/TutorialCorrecting';
import TutorialPostDiary from '../components/organisms/TutorialPostDiary';
import TutorialPoints from '../components/organisms/TutorialPoints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
});

/**
 * 設定画面ページ
 */
const TutorialListScreen: NavigationStackScreenComponent = () => {
  // trueの時が非表示
  const [tutorialCorrecting, setTutorialCorrecting] = useState(true);
  const [tutorialPostDiary, setTutorialPostDiary] = useState(true);
  const [tutorialPoints, setTutorialPoints] = useState(true);

  const buttonText = '閉じる';

  return (
    <View style={styles.container}>
      <TutorialCorrecting
        displayed={tutorialCorrecting}
        buttonText={buttonText}
        onPress={(): void => setTutorialCorrecting(true)}
      />
      <TutorialPostDiary
        displayed={tutorialPostDiary}
        buttonText={buttonText}
        onPress={(): void => setTutorialPostDiary(true)}
      />
      <TutorialPoints
        displayed={tutorialPoints}
        buttonText={buttonText}
        onPress={(): void => setTutorialPoints(true)}
      />
      <OptionItem
        title="添削の仕方"
        onPress={(): void => setTutorialCorrecting(false)}
      />
      <OptionItem
        title="日記の書き方"
        onPress={(): void => setTutorialPostDiary(false)}
      />
      <OptionItem
        title="ポイントについて"
        onPress={(): void => setTutorialPoints(false)}
      />
    </View>
  );
};

TutorialListScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: 'チュートリアル一覧',
  };
};

export default TutorialListScreen;
