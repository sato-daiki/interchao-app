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
import DefaultLayout from '../template/DefaultLayout';
import ModalConfirm from './ModalConfirm';
import PostDiaryKeybordWeb from './PostDiaryKeybordWeb';

interface Props {
  isLoading: boolean;
  isModalLack: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  isModalError: boolean;
  isTutorialLoading?: boolean;
  tutorialPostDiary?: boolean;
  errorMessage: string;
  title: string;
  text: string;
  points: number;
  learnLanguage: Language;
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  onPressCloseModalPublish: () => void;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressSubmit: () => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
  onPressCloseError: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: offWhite,
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
  isModalError,
  isTutorialLoading = false,
  tutorialPostDiary = true,
  errorMessage,
  title,
  text,
  points,
  learnLanguage,
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
  onPressCloseError,
}: Props): JSX.Element => {
  const [isForce, setIsForce] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      easing: Easing.back(1),
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onFocusText = (): void => {
    setFadeAnim(new Animated.Value(0));
    setIsForce(true);
  };

  const usePoints = getUsePoints(text.length, learnLanguage);

  const renderKeyboard = (): JSX.Element => {
    if (Platform.OS === 'ios') {
      return (
        <PostDiaryKeyboardIOS
          title={title}
          text={text}
          isForce={isForce}
          fadeAnim={fadeAnim}
          onChangeTextTitle={onChangeTextTitle}
          onChangeTextText={onChangeTextText}
          onPressDraft={onPressDraft}
          onFocusText={onFocusText}
          onBlurText={(): void => setIsForce(false)}
        />
      );
    }

    if (Platform.OS === 'web') {
      return (
        <PostDiaryKeybordWeb
          title={title}
          text={text}
          onChangeTextTitle={onChangeTextTitle}
          onChangeTextText={onChangeTextText}
          onPressDraft={onPressDraft}
        />
      );
    }

    return (
      <PostDiaryKeybordAndroid
        title={title}
        text={text}
        onChangeTextTitle={onChangeTextTitle}
        onChangeTextText={onChangeTextText}
        onPressDraft={onPressDraft}
        onFocusText={onFocusText}
        onBlurText={(): void => setIsForce(false)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <DefaultLayout lSize> */}
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      <TutorialPostDiary
        isLoading={isTutorialLoading}
        displayed={tutorialPostDiary}
        learnLanguage={learnLanguage}
        onPress={onPressTutorial}
      />
      <ModalLackPoint
        visible={isModalLack}
        learnLanguage={learnLanguage}
        onPressSubmit={onPressSubmitModalLack}
        onPressClose={onPressCloseModalLack}
      />
      <ModalAlertPublish
        visible={isModalAlert}
        isLoading={isLoading}
        usePoints={usePoints}
        points={points}
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
      {renderKeyboard()}
      {/* </DefaultLayout> */}
    </SafeAreaView>
  );
};

export default PostDiary;
