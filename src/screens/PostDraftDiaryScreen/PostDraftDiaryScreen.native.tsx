import React, { useLayoutEffect } from 'react';

import { HeaderText } from '@/components/atoms';
import { PostDiary } from '@/components/organisms/PostDiary';

import I18n from '@/utils/I18n';
import { DefaultModalLayoutOptions, DefaultNavigationOptions } from '@/constants/NavigationOptions';
import { usePostDraftDiary } from './usePostDraftDiary';
import { ScreenType } from './interfaces';

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
    onPressWatchAdModalLack,
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
  } = usePostDraftDiary({
    navigation,
    route,
    user,
    profile,
    setUser,
    editDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      ...DefaultNavigationOptions,
      ...DefaultModalLayoutOptions,
      title: I18n.t('postDraftDiary.headerTitle'),
      headerLeft: () => <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />,
      headerRight: () => {
        if (user.points >= 10) {
          return <HeaderText text={I18n.t('common.publish')} onPress={onPressPublic} />;
        }
        return <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title]);

  const { item } = route.params;

  return (
    <PostDiary
      navigation={navigation}
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
      nativeLanguage={profile.nativeLanguage}
      learnLanguage={profile.learnLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onPressWatchAdModalLack={onPressWatchAdModalLack}
      onClosePostDiary={onClosePostDiary}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDraftDiaryScreen;
