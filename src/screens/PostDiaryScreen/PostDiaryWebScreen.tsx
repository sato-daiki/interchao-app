import React, { useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { User } from '@/types/user';
import { Profile, Diary } from '@/types';
import PostDiaryWeb from '@/components/features/PostDiaryWeb';
import {
  ModalPostDiaryStackParamList,
  ModalPostDiaryStackNavigationProp,
} from '@/navigations/ModalNavigator';
import I18n from '@/utils/I18n';

import HeaderTitle from '@/components/features/PostDiaryWeb/HeaderTitle';
import {
  HeaderText,
  SmallButtonSubmit,
  SmallButtonWhite,
} from '@/components/atoms';
import { primaryColor } from '@/styles/Common';
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

const PostDiaryWebScreen: React.FC<ScreenType> = ({
  navigation,
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
              isLoading={isLoadingPublish}
              containerStyle={styles.publish}
              title={I18n.t('common.publish')}
              // color={mainColor}
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
  }, [isFirstEdit, isLoadingDraft, isLoadingPublish, user.points]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerRight,
      headerTitle: (): JSX.Element => <HeaderTitle />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft, isFirstEdit]);

  return (
    <PostDiaryWeb
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

export default PostDiaryWebScreen;
