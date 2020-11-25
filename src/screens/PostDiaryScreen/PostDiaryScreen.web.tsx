import React, { useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import PostDiaryWeb from '@/components/organisms/PostDiaryWeb/PostDiaryWeb';
import HeaderTitle from '@/components/organisms/PostDiaryWeb/HeaderTitle';
import {
  HeaderText,
  SmallButtonSubmit,
  SmallButtonWhite,
} from '@/components/atoms';

import I18n from '@/utils/I18n';
import { primaryColor } from '@/styles/Common';
import { usePostDiary } from './usePostDiary';
import { ScreenType } from './interfaces';

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  draft: {
    marginRight: 12,
    width: 100,
  },
  publish: {
    width: 100,
  },
});

const PostDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  addDiary,
}) => {
  const {
    isLoadingDraft,
    isLoadingPublish,
    isFirstEdit,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
    isTutorialLoading,
    errorMessage,
    title,
    text,
    publishMessage,
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
    onPressPublic,
    onPressClose,
  } = usePostDiary({
    navigation,
    route,
    user,
    profile,
    setUser,
    addDiary,
  });

  const headerLeft = useCallback(
    () => <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />,
    [onPressClose]
  );

  const headerRight = useCallback(() => {
    if (isFirstEdit) {
      if (user.points >= 10) {
        return (
          <View style={styles.headerWrapper}>
            <SmallButtonWhite
              isLoading={isLoadingDraft}
              containerStyle={styles.draft}
              title={I18n.t('common.draft')}
              color={primaryColor}
              onPress={onPressDraft}
            />
            <SmallButtonSubmit
              containerStyle={styles.publish}
              title={I18n.t('common.publish')}
              onPress={onPressPublic}
            />
          </View>
        );
      }
      return (
        <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft, isFirstEdit]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Interchao',
      headerLeft,
      headerRight,
      headerTitle: (): JSX.Element => <HeaderTitle />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft, isFirstEdit]);

  return (
    <PostDiaryWeb
      navigation={navigation}
      isLoading={isLoadingPublish || isLoadingDraft}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      isPublish={isPublish}
      isTutorialLoading={isTutorialLoading}
      tutorialPostDiary={user.tutorialPostDiary}
      errorMessage={errorMessage}
      title={title}
      text={text}
      themeCategory={route?.params?.themeCategory}
      themeSubcategory={route?.params?.themeSubcategory}
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onClosePostDiary={onClosePostDiary}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressTutorial={onPressTutorial}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDiaryScreen;
