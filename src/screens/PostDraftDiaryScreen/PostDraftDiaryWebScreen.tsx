import React, { useCallback, useLayoutEffect } from 'react';
import { HeaderTitle, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

import {
  HeaderText,
  SmallButtonSubmit,
  SmallButtonWhite,
} from '@/components/atoms';
import { Profile, Diary, User } from '@/types';
import I18n from '@/utils/I18n';
import {
  ModalPostDraftDiaryStackParamList,
  ModalPostDraftDiaryStackNavigationProp,
} from '@/navigations/ModalNavigator';
import PostDiaryWeb from '@/components/organisms/PostDiaryWeb/PostDiaryWeb';
import { View } from 'react-native-animatable';
import { primaryColor } from '@/styles/Common';
import { StyleSheet } from 'react-native';
import { usePostDraftDiary } from './usePostDraftDiary';

export interface WebProps {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>,
  ModalPostDraftDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>;
} & WebProps &
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

/**
 * 概要：日記投稿画面
 */
const PostDraftDiaryWebScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  editDiary,
}) => {
  const {
    isLoadingDraft,
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
      headerLeft,
      headerRight,
      headerTitle: (): JSX.Element => <HeaderTitle />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title, isLoadingDraft]);

  return (
    <PostDiaryWeb
      isLoading={isLoading || isLoadingDraft}
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

export default PostDraftDiaryWebScreen;
