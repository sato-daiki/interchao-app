import React, { useLayoutEffect } from 'react';

import { HeaderText } from '@/components/atoms';
import PostDiary from '@/components/organisms/PostDiary';
import I18n from '@/utils/I18n';
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
    isLoading,
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
      isLoading={isLoading}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      isPublish={isPublish}
      errorMessage={errorMessage}
      title={title}
      text={text}
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
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
    />
  );
};

export default PostDraftDiaryScreen;
