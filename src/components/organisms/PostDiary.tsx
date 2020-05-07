import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  Easing,
  Platform,
} from 'react-native';

import { LoadingModal } from '../atoms';
import ModalAlertPublish from './ModalAlertPublish';
import ModalLackPoint from './ModalLackPoint';
import ModalDiaryCancel from './ModalDiaryCancel';
import {
  primaryColor,
  borderLightColor,
  offWhite,
  fontSizeSS,
} from '../../styles/Common';
import { Points } from '../../images';
import { getUsePoints } from '../../utils/diary';
import { Language } from '../../types';
import TutorialPostDiary from './TutorialPostDiary';
import I18n from '../../utils/I18n';
import PostDiaryKeyboardIOS from './PostDiaryKeyboardIOS';
import PostDiaryKeybordAndroid from './PostDiaryKeybordAndroid';

interface Props {
  isLoading: boolean;
  isModalLack: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  // isPublic: boolean;
  isTutorialLoading?: boolean;
  tutorialPostDiary?: boolean;
  title: string;
  text: string;
  points: number;
  learnLanguage: Language;
  nativeLanguage: Language;
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  // onValueChangePublic: () => void;
  onPressCloseModalPublish: () => void;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressSubmit: () => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingLeft: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    width: 16,
    height: 16,
    tintColor: primaryColor,
    marginRight: 3,
  },
  headerLabel: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 4,
  },
  headerValue: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 16,
  },
});

const PostDiary = ({
  isLoading,
  isModalLack,
  isModalAlert,
  isModalCancel,
  // isPublic,
  isTutorialLoading = false,
  tutorialPostDiary = true,
  title,
  text,
  points,
  learnLanguage,
  nativeLanguage,
  // onValueChangePublic,
  onPressSubmitModalLack,
  onPressCloseModalLack,
  onPressCloseModalPublish,
  onPressCloseModalCancel,
  onChangeTextTitle,
  onChangeTextText,
  onPressSubmit,
  onPressDraft,
  onPressNotSave,
  onPressTutorial,
}: Props): JSX.Element => {
  const [isForce, setIsForce] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      easing: Easing.back(1),
      duration: 400,
    }).start();
  }, [fadeAnim]);

  const onFocusText = (): void => {
    setFadeAnim(new Animated.Value(0));
    setIsForce(true);
  };
  const usePoints = getUsePoints(text.length, learnLanguage);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <TutorialPostDiary
        isLoading={isTutorialLoading}
        displayed={tutorialPostDiary}
        learnLanguage={learnLanguage}
        nativeLanguage={nativeLanguage}
        onPress={onPressTutorial}
      />
      <ModalLackPoint
        visible={isModalLack}
        learnLanguage={learnLanguage}
        nativeLanguage={nativeLanguage}
        onPressSubmit={onPressSubmitModalLack}
        onPressClose={onPressCloseModalLack}
      />
      <ModalAlertPublish
        visible={isModalAlert}
        isLoading={isLoading}
        // isPublic={isPublic}
        usePoints={usePoints}
        points={points}
        // onValueChangePublic={onValueChangePublic}
        onPressSubmit={onPressSubmit}
        onPressClose={onPressCloseModalPublish}
      />
      <ModalDiaryCancel
        visible={isModalCancel}
        isLoading={isLoading}
        onPressSave={onPressDraft}
        onPressNotSave={onPressNotSave}
        onPressClose={onPressCloseModalCancel}
      />
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.usePoints')}
          </Text>
          <Text style={styles.headerValue}>{usePoints}</Text>
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.textLength')}
          </Text>
          <Text style={styles.headerValue}>{text.length}</Text>
        </View>
        <View style={styles.right}>
          <Image style={styles.points} source={Points} />
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.points')}
          </Text>
          <Text style={styles.headerValue}>{points}</Text>
        </View>
      </View>
      {Platform.OS === 'ios' ? (
        <PostDiaryKeyboardIOS
          title={title}
          text={text}
          isForce={isForce}
          fadeAnim={fadeAnim}
          onChangeTextTitle={onChangeTextTitle}
          onChangeTextText={onChangeTextText}
          onPressDraft={onPressDraft}
          onFocusText={onFocusText}
          onEndEditingText={(): void => setIsForce(false)}
        />
      ) : (
        <PostDiaryKeybordAndroid
          title={title}
          text={text}
          onChangeTextTitle={onChangeTextTitle}
          onChangeTextText={onChangeTextText}
          onPressDraft={onPressDraft}
          onFocusText={onFocusText}
          onEndEditingText={(): void => setIsForce(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default PostDiary;
