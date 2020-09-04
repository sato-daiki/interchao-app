import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { offWhite } from '../styles/Common';
import { OptionItem } from '../components/molecules';
import TutorialPostDiary from '../components/organisms/TutorialPostDiary';
import TutorialPoints from '../components/organisms/TutorialPoints';
import I18n from '../utils/I18n';
import { Profile } from '../types';
import { MyPageTabStackParamList } from '../navigations/MainTabNavigator';

export interface Props {
  profile: Profile;
}

type ScreenType = StackScreenProps<MyPageTabStackParamList, 'TutorialList'> &
  Props;

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
const TutorialListScreen: React.FC<ScreenType> = ({ profile }) => {
  // trueの時が非表示
  const [tutorialPostDiary, setTutorialPostDiary] = useState(true);
  const [tutorialPoints, setTutorialPoints] = useState(true);

  const buttonText = I18n.t('common.close');

  return (
    <View style={styles.container}>
      <TutorialPostDiary
        displayed={tutorialPostDiary}
        buttonText={buttonText}
        learnLanguage={profile.learnLanguage}
        onPress={(): void => setTutorialPostDiary(true)}
      />
      <TutorialPoints
        displayed={tutorialPoints}
        buttonText={buttonText}
        onPress={(): void => setTutorialPoints(true)}
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

export default TutorialListScreen;
