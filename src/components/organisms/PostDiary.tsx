import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingModal, TextButtun } from '../atoms';
import ModalAlertPublish from './ModalAlertPublish';
import ModalLackPoint from './ModalLackPoint';
import ModalDiaryCancel from './ModalDiaryCancel';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  mainColor,
  fontSizeS,
} from '../../styles/Common';
import { Points } from '../../images';
import { getUsePoints } from '../../utils/diary';
import { Language } from '../../types';
import TutorialPostDiary from './TutorialPostDiary';
import I18n from '../../utils/I18n';

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
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  // onValueChangePublic: () => void;
  onPressCloseModalPublic: () => void;
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
    marginLeft: 16,
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
    fontSize: fontSizeS,
    marginRight: 4,
  },
  headerValue: {
    color: primaryColor,
    fontSize: fontSizeS,
    marginRight: 16,
  },
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    padding: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  textInput: {
    padding: 16,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.7,
    textAlignVertical: 'top',
    flex: 1,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
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
  // onValueChangePublic,
  onPressSubmitModalLack,
  onPressCloseModalLack,
  onPressCloseModalPublic,
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

  const onFocus = (): void => {
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
        onPress={onPressTutorial}
      />
      <ModalLackPoint
        visible={isModalLack}
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
        onPressClose={onPressCloseModalPublic}
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
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={onChangeTextTitle}
        placeholder="Title"
        maxLength={100}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={onChangeTextText}
        onFocus={onFocus}
        onEndEditing={(): void => setIsForce(false)}
        placeholder={I18n.t('postDiaryComponent.textPlaceholder')}
        underlineColorAndroid="transparent"
        multiline
        autoCapitalize="none"
        keyboardType="default"
      />
      {isForce ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity onPress={Keyboard.dismiss} style={styles.icon}>
            <MaterialCommunityIcons
              size={28}
              color={mainColor}
              name="keyboard-close"
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
      <KeyboardSpacer />
      <View style={styles.footer}>
        <TextButtun
          isBorrderTop
          isBorrderBottom
          title={I18n.t('postDiaryComponent.draft')}
          onPress={onPressDraft}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostDiary;
