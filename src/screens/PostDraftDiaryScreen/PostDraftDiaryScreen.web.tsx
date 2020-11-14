import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  HeaderText,
  SmallButtonSubmit,
  SmallButtonWhite,
} from '@/components/atoms';
import HeaderTitle from '@/components/organisms/PostDiaryWeb/HeaderTitle';
import PostDiaryWeb from '@/components/organisms/PostDiaryWeb/PostDiaryWeb';

import I18n from '@/utils/I18n';
import { primaryColor } from '@/styles/Common';
import { usePostDraftDiary } from './usePostDraftDiary';
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

/**
 * 概要：日記投稿画面
 */
const PostDraftDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  editDiary,
}) => {
  const {
    isInitialLoading,
    isLoadingPublish,
    isLoadingDraft,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
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
    onPressCloseError,
    onPressPublic,
    onPressClose,
    onPressThemeGuide,
  } = usePostDraftDiary({
    navigation,
    route,
    user,
    profile,
    setUser,
    editDiary,
  });

  const headerLeft = useCallback(
    () => <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />,
    [onPressClose]
  );

  const headerRight = useCallback(() => {
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
    return <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Interchao',
      headerLeft,
      headerRight,
      headerTitle: (): JSX.Element => <HeaderTitle />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft]);

  const { item } = route.params;

  return (
    <PostDiaryWeb
      isLoading={isInitialLoading || isLoadingDraft || isLoadingPublish}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      isPublish={isPublish}
      errorMessage={errorMessage}
      title={title}
      text={text}
      themeCategory={item.themeCategory}
      themeSubcategory={item.themeSubcategory}
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onClosePostDiary={onClosePostDiary}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
      onPressThemeGuide={onPressThemeGuide}
    />
  );
};

export default PostDraftDiaryScreen;
