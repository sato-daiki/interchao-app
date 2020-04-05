import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoadingModal, TextButtun } from '../atoms';
import { ModalAlertPublish, ModalLackPoint } from '.';
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

const { height } = Dimensions.get('window');
const defaultHeight = height - 520;

interface Props {
  isLoading: boolean;
  isModalLack: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  isPublic: boolean;
  isTutorialLoading?: boolean;
  tutorialPostDiary?: boolean;
  title: string;
  text: string;
  points: number;
  learnLanguage: Language;
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  onValueChangePublic: () => void;
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
    height: defaultHeight,
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
  keyboardAwareScrollView: {
    flex: 1,
  },
});

const PostDiary = ({
  isLoading,
  isModalLack,
  isModalAlert,
  isModalCancel,
  isPublic,
  isTutorialLoading = false,
  tutorialPostDiary = true,
  title,
  text,
  points,
  learnLanguage,
  onValueChangePublic,
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
        isPublic={isPublic}
        usePoints={usePoints}
        points={points}
        onValueChangePublic={onValueChangePublic}
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
          <Text style={styles.headerLabel}>消費ポイント</Text>
          <Text style={styles.headerValue}>{usePoints}</Text>
          <Text style={styles.headerLabel}>文字数</Text>
          <Text style={styles.headerValue}>{text.length}</Text>
        </View>
        <View style={styles.right}>
          <Image style={styles.points} source={Points} />
          <Text style={styles.headerLabel}>所持ポイント</Text>
          <Text style={styles.headerValue}>{usePoints}</Text>
        </View>
      </View>
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
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
          onFocus={(): void => setIsForce(true)}
          onEndEditing={(): void => setIsForce(false)}
          placeholder="本文"
          underlineColorAndroid="transparent"
          multiline
          autoCapitalize="none"
          keyboardType="default"
        />
        {/* keybordアイコン自体はクリックしても意味がない */}
        {isForce ? (
          <View style={styles.icon}>
            <MaterialCommunityIcons
              size={28}
              color={mainColor}
              name="keyboard-close"
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
      <TextButtun
        isBorrderTop
        isBorrderBottom
        title="下書き保存"
        onPress={onPressDraft}
      />
    </SafeAreaView>
  );
};

export default PostDiary;
