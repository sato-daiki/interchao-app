import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { User } from '@/types/user';
import { Profile, Diary } from '@/types';
import PostDiary from '@/components/organisms/PostDiary';
import { HeaderText } from '@/components/atoms';
import {
  ModalPostDiaryStackParamList,
  ModalPostDiaryStackNavigationProp,
} from '@/navigations/ModalNavigator';
import I18n from '@/utils/I18n';

import { usePostDiary } from './usePostDiary';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDiaryStackParamList, 'PostDiary'>,
  ModalPostDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: React.FC<ScreenType> = ({
  navigation,
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
    onPressCloseSns,
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
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onPressCloseSns={onPressCloseSns}
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
