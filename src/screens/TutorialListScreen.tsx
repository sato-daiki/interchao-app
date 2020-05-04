import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import { offWhite } from '../styles/Common';
import { OptionItem } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import ModalTutorialCorrecting from '../components/organisms/ModalTutorialCorrecting';
import TutorialPostDiary from '../components/organisms/TutorialPostDiary';
import TutorialPoints from '../components/organisms/TutorialPoints';
import I18n from '../utils/I18n';
import { Profile } from '../types';

export interface Props {
  profile: Profile;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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
const TutorialListScreen: ScreenType = ({ profile }) => {
  // trueの時が表示
  const [isModalTutorialCorrecting, setIsModalTutorialCorrecting] = useState(
    false
  );
  // trueの時が非表示
  const [tutorialPostDiary, setTutorialPostDiary] = useState(true);
  const [tutorialPoints, setTutorialPoints] = useState(true);

  const buttonText = I18n.t('common.close');

  return (
    <View style={styles.container}>
      {/** これだけ true/faseが逆 */}
      <ModalTutorialCorrecting
        visible={isModalTutorialCorrecting}
        nativeLanguage={profile.nativeLanguage}
        buttonText={buttonText}
        rightButtonText={buttonText}
        onPress={(): void => setIsModalTutorialCorrecting(false)}
      />
      <TutorialPostDiary
        displayed={tutorialPostDiary}
        buttonText={buttonText}
        learnLanguage={profile.learnLanguage}
        nativeLanguage={profile.nativeLanguage}
        onPress={(): void => setTutorialPostDiary(true)}
      />
      <TutorialPoints
        displayed={tutorialPoints}
        buttonText={buttonText}
        onPress={(): void => setTutorialPoints(true)}
      />
      <OptionItem
        title={I18n.t('tutorialList.correcting')}
        onPress={(): void => setIsModalTutorialCorrecting(true)}
      />
      <OptionItem
        title={I18n.t('tutorialList.postDiary')}
        onPress={(): void => setTutorialPostDiary(false)}
      />
      <OptionItem
        title={I18n.t('tutorialList.points')}
        onPress={(): void => setTutorialPoints(false)}
      />
    </View>
  );
};

TutorialListScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('tutorialList.headerTitle'),
  };
};

export default TutorialListScreen;
