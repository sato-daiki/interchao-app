import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  fontSizeLL,
  fontSizeL,
  fontSizeM,
  maxLayoutChange,
  primaryColor,
  subTextColor,
  softRed,
} from '@/styles/Common';
import { getMaxPostText, getUsePoints } from '@/utils/diary';
import { Language } from '@/types';
import I18n from '@/utils/I18n';
import { LoadingModal, Space, TextInputTitle } from '@/components/atoms';
import { ScrollView } from 'react-native-gesture-handler';
import { ModalPublish } from '../ModalPublish';
import ModalLackPoint from '../ModalLackPoint';
import ModalDiaryCancel from '../ModalDiaryCancel';
import TutorialPostDiary from '../TutorialPostDiary';
import ModalConfirm from '../ModalConfirm';

interface Props {
  isLoading: boolean;
  isModalLack: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  isModalError: boolean;
  isPublish: boolean;
  isTutorialLoading?: boolean;
  tutorialPostDiary?: boolean;
  errorMessage: string;
  title: string;
  text: string;
  publishMessage: string | null;
  points: number;
  learnLanguage: Language;
  nativeLanguage: Language;
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  onPressCloseModalPublish: () => void;
  onPressCloseModalCancel: () => void;
  onClosePostDiary: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressSubmit: () => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
  onPressCloseError: () => void;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    paddingVertical: 32,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    maxWidth: maxLayoutChange,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleInput: {
    paddingVertical: 32,
    fontSize: fontSizeLL,
    borderBottomWidth: 0,
  },
  textInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    color: primaryColor,
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
    textAlignVertical: 'top',
  },
  rightContainer: {
    width: 124,
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
  },
});

const PostDiaryWeb = ({
  isLoading,
  isModalLack,
  isModalAlert,
  isModalCancel,
  isModalError,
  isPublish,
  isTutorialLoading = false,
  tutorialPostDiary = true,
  errorMessage,
  title,
  text,
  publishMessage,
  points,
  learnLanguage,
  nativeLanguage,
  onPressSubmitModalLack,
  onPressCloseModalLack,
  onPressCloseModalPublish,
  onPressCloseModalCancel,
  onClosePostDiary,
  onChangeTextTitle,
  onChangeTextText,
  onPressSubmit,
  onPressDraft,
  onPressNotSave,
  onPressTutorial,
  onPressCloseError,
}: Props): JSX.Element => {
  const usePoints = getUsePoints(text.length, learnLanguage);
  const maxPostText = getMaxPostText(learnLanguage);

  return (
    <ScrollView style={styles.warapper}>
      <View style={styles.container}>
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
        <ModalPublish
          visible={isModalAlert}
          isPublish={isPublish}
          isLoading={isLoading}
          usePoints={usePoints}
          points={points}
          publishMessage={publishMessage}
          onPressSubmit={onPressSubmit}
          onPressCloseCancel={onPressCloseModalPublish}
          onClosePostDiary={onClosePostDiary}
        />
        <ModalDiaryCancel
          visible={isModalCancel}
          isLoading={isLoading}
          onPressSave={onPressDraft}
          onPressNotSave={onPressNotSave}
          onPressClose={onPressCloseModalCancel}
        />
        <View style={styles.mainContainer}>
          <View style={styles.leftContainer}>
            <TextInputTitle
              style={styles.titleInput}
              value={title}
              onChangeText={onChangeTextTitle}
            />
            <TextInput
              style={styles.textInput}
              value={text}
              placeholder={I18n.t('postDiaryComponent.textPlaceholder')}
              underlineColorAndroid="transparent"
              multiline
              autoCorrect={false}
              keyboardType="default"
              spellCheck
              onChangeText={onChangeTextText}
              numberOfLines={100}
              maxLength={maxPostText}
            />
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.subText,
                { color: text.length === maxPostText ? softRed : primaryColor },
              ]}
            >
              {`${text.length} 文字`}
            </Text>
            <Space size={16} />
            <Text style={styles.subText}>
              {`${I18n.t('postDiaryComponent.usePoints')} ${usePoints}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDiaryWeb;
