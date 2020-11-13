import React, { useLayoutEffect } from 'react';
import { PostDiary } from '@/components/organisms/PostDiary';
import { HeaderText } from '@/components/atoms';
import I18n from '@/utils/I18n';

import { usePostDiary } from './usePostDiary';
import { ScreenType } from './interfaces';

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  addDiary,
}) => {
  const {
    isLoadingPublish,
    isLoadingDraft,
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
    subcatergoryInfo: route?.params?.subcatergoryInfo,
    user,
    profile,
    setUser,
    addDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (): JSX.Element => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: (): JSX.Element => {
        if (user.points >= 10) {
          return (
            <HeaderText
              text={I18n.t('common.publish')}
              onPress={onPressPublic}
            />
          );
        }
        return (
          <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title]);

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isLoadingDraft || isLoadingPublish}
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
      subcatergoryInfo={route?.params?.subcatergoryInfo}
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={profile.learnLanguage}
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
