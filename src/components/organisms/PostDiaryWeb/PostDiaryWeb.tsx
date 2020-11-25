import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

import I18n from '@/utils/I18n';
import {
  fontSizeLL,
  fontSizeL,
  fontSizeM,
  maxLayoutChange,
  primaryColor,
  subTextColor,
  softRed,
  linkBlue,
} from '@/styles/Common';
import { getMaxPostText, getUsePoints } from '@/utils/diary';
import {
  Hoverable,
  LoadingModal,
  Space,
  TextInputTitle,
} from '@/components/atoms';
import { Modal } from '@/components/template';
import { ModalPublish } from '../ModalPublish';
import ModalLackPoint from '../ModalLackPoint';
import ModalDiaryCancel from '../ModalDiaryCancel';
import TutorialPostDiary from '../TutorialPostDiary';
import ModalConfirm from '../ModalConfirm';
import { PostDiaryProps } from '../PostDiary/interface';
import ThemeGuideWeb from '../ThemeGuide/ThemeGuideWeb';

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
    width: 132,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
  },
  linkText: {
    marginTop: 16,
    fontSize: fontSizeM,
    color: linkBlue,
  },
});

const PostDiaryWeb: React.FC<PostDiaryProps> = ({
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
  themeCategory,
  themeSubcategory,
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
}) => {
  const [isModalThemeGuide, setIsModalThemeGuide] = useState(false);
  const usePoints = getUsePoints(text.length, learnLanguage);
  const maxPostText = getMaxPostText(learnLanguage);

  const onPressThemeGuide = useCallback(() => {
    setIsModalThemeGuide(true);
  }, []);

  const onPressCloseThemeGuide = useCallback(() => {
    setIsModalThemeGuide(false);
  }, []);

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
        {themeCategory && themeSubcategory ? (
          <Modal visible={isModalThemeGuide} disablePadding>
            <ThemeGuideWeb
              themeCategory={themeCategory}
              themeSubcategory={themeSubcategory}
              learnLanguage={learnLanguage}
              nativeLanguage={nativeLanguage}
              onPressClose={onPressCloseThemeGuide}
              onPressBegin={onPressCloseThemeGuide}
            />
          </Modal>
        ) : null}
        <View style={styles.mainContainer}>
          <View style={styles.leftContainer}>
            <TextInputTitle
              editable={!themeCategory || !themeSubcategory}
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
            {!themeCategory || !themeSubcategory ? null : (
              <Hoverable onPress={onPressThemeGuide}>
                <Text style={styles.linkText}>
                  {`${I18n.t('postDiaryComponent.hint')}`}
                </Text>
              </Hoverable>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDiaryWeb;
