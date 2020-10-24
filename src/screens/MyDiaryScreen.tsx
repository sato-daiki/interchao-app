import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { TabView } from 'react-native-tab-view';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import firebase from '../constants/firebase';
import { AppReviewState, Diary, LocalStatus, Profile, User } from '../types';
import { ModalConfirm } from '../components/features';
import {
  LoadingModal,
  HeaderIcon,
  HeaderText,
  DefaultHeaderBack,
} from '../components/atoms';
import I18n from '../utils/I18n';
import MyDiaryMenu from '../components/web/organisms/MyDiaryMenu';
import {
  MyDiaryTabNavigationProp,
  MyDiaryTabStackParamList,
} from '../navigations/MyDiaryTabNavigator';
import Posted from '../components/features/Posted';
import FairCopy from '../components/features/FairCopy';
import FairCopyEdit from '../components/features/FairCopyEdit';
import { MyDiaryTabBar } from '../components/molecules';
import ModalAppReviewRequest from '../components/features/ModalAppReviewRequest';

export interface Props {
  diary?: Diary;
  profile: Profile;
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
  setUser: (user: User) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
}

type MyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiary'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const initialLayout = { width: Dimensions.get('window').width };

/**
 * 日記詳細
 */
const MyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  profile,
  diary,
  user,
  localStatus,
  deleteDiary,
  editDiary,
  setUser,
  setLocalStatus,
}) => {
  const initFairCopyTitle = (): string => {
    if (!diary) return '';
    return diary.fairCopyTitle || diary.title;
  };
  const initFairCopyText = (): string => {
    if (!diary) return '';
    return diary.fairCopyText || diary.text;
  };

  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAlertAudio, setIsModalAlertAudio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時
  const [fairCopyTitle, setFairCopyTitle] = useState<string>(
    initFairCopyTitle()
  );
  const [fairCopyText, setFairCopyText] = useState<string>(initFairCopyText());

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posted', title: I18n.t('myDiary.posted') },
    { key: 'fairCopy', title: I18n.t('myDiary.fairCopy') },
  ]);

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const onPressMore = useCallback(() => {
    const options = [I18n.t('myDiary.menuDelete'), I18n.t('common.cancel')];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      i => {
        switch (i) {
          case 0:
            setIsModalDelete(true);
            break;
          default:
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const onPressSubmit = async (): Promise<void> => {
    if (!diary || !diary.objectID || isLoading) return;

    setIsLoading(true);
    await firebase
      .firestore()
      .doc(`diaries/${diary.objectID}`)
      .update({
        fairCopyTitle,
        fairCopyText,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    editDiary(diary.objectID, { ...diary, fairCopyTitle, fairCopyText });
    setIsLoading(false);
    setIsEditing(false);
  };

  const onPressDelete = useCallback(() => {
    if (!diary || !diary.objectID) return;
    setIsLoading(true);
    firebase
      .firestore()
      .collection('diaries')
      .doc(diary.objectID)
      .delete();
    setIsModalDelete(false);
    // reduxの設定
    deleteDiary(diary.objectID);
    navigation.goBack();
    setIsLoading(false);
  }, [deleteDiary, diary, navigation]);

  const onClose = (): void => {
    setIsEditing(false);
    setFairCopyTitle(initFairCopyTitle());
    setFairCopyText(initFairCopyText());
    setIsModalConfirmation(false);
  };

  const onPressClose = (): void => {
    if (isFirstEdit) {
      setIsModalConfirmation(true);
    } else {
      onClose();
    }
  };

  const updateAppReviewState = useCallback(
    (appReviewState: AppReviewState) => {
      setUser({ ...user, appReviewState });
    },
    [setUser, user]
  );

  const onCloseModalAppReviewRequest = useCallback((): void => {
    setLocalStatus({ ...localStatus, isModalAppReviewRequest: false });
  }, [localStatus, setLocalStatus]);

  const headerRight = (): ReactNode => {
    if (!isEditing) {
      if (index === 0) {
        if (isDesktopOrLaptopDevice) {
          return (
            <MyDiaryMenu
              onPressDeleteMenu={(): void => setIsModalDelete(true)}
            />
          );
        }
        return (
          <HeaderIcon
            icon="community"
            name="dots-horizontal"
            onPress={onPressMore}
          />
        );
      }
      if (index === 1) {
        return (
          <HeaderText
            text={I18n.t('common.edit')}
            onPress={(): void => setIsEditing(true)}
          />
        );
      }
      return <View />;
    }
    if (!isFirstEdit || index === 0) {
      return null;
    }
    return <HeaderText text={I18n.t('common.done')} onPress={onPressSubmit} />;
  };

  useEffect(() => {
    navigation.setOptions({
      title: diary ? diary.title : '',
      headerLeft: () =>
        !isEditing ? (
          <DefaultHeaderBack onPress={(): void => navigation.goBack()} />
        ) : (
          <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
        ),
      headerRight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diary, index, isEditing, isFirstEdit]);

  const onPressUser = (uid: string, userName: string): void => {
    navigation.navigate('UserProfile', {
      userName,
    });
  };

  const onPressReview = async (correctedNum: number): Promise<void> => {
    if (!diary || !diary.objectID) return;
    if (isLoading) return;
    setIsLoading(true);
    navigation.navigate('ModalReview', {
      screen: 'Review',
      params: {
        objectID: diary.objectID,
        correctedNum,
        userName: diary.profile.userName,
      },
    });
    setIsLoading(false);
  };

  const checkPermissions = async (): Promise<boolean> => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (response.status !== 'granted') {
      setIsModalAlertAudio(true);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const goToRecord = async (): Promise<void> => {
    if (!diary || !diary.objectID) return;

    const res = await checkPermissions();
    if (!res) return;

    navigation.navigate('ModalRecord', {
      screen: 'Record',
      params: { objectID: diary.objectID },
    });
  };

  const goToRecommend = (): void => {
    const url =
      profile.nativeLanguage === 'ja'
        ? 'https://note.com/interchao/n/nd0a563f2edd4'
        : 'https://note.com/interchao/n/n5cba7273130d';

    if (Platform.OS === 'web') {
      Linking.openURL(url);
    } else {
      navigation.navigate('RecommendedMethod', { url });
    }
  };

  if (!diary) {
    return null;
  }

  const renderScene = ({ route }): JSX.Element | null => {
    if (!diary) return null;
    switch (route.key) {
      case 'posted':
        return (
          <Posted
            profile={profile}
            diary={diary}
            isEditing={isEditing}
            onPressUser={onPressUser}
            onPressReview={onPressReview}
          />
        );
      case 'fairCopy':
        return !isEditing ? (
          <FairCopy
            diary={diary}
            profile={profile}
            goToRecord={goToRecord}
            goToRecommend={goToRecommend}
            checkPermissions={checkPermissions}
          />
        ) : (
          <FairCopyEdit
            title={fairCopyTitle}
            text={fairCopyText}
            onChangeTextTitle={(title: string): void => setFairCopyTitle(title)}
            onChangeTextText={(text: string): void => setFairCopyText(text)}
            onFocus={(): void => setIsFirstEdit(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalAppReviewRequest
        visible={localStatus.isModalAppReviewRequest || false}
        profile={profile}
        updateAppReviewState={updateAppReviewState}
        onClose={onCloseModalAppReviewRequest}
      />
      <ModalConfirm
        visible={isModalDelete}
        isLoading={isLoading}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.confirmMessage')}
        mainButtonText={I18n.t('myDiary.menuDelete')}
        onPressMain={onPressDelete}
        onPressClose={(): void => setIsModalDelete(false)}
      />
      <ModalConfirm
        visible={isModalConfirmation}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.closeAlert')}
        mainButtonText="OK"
        onPressMain={onClose}
        onPressClose={(): void => setIsModalConfirmation(false)}
      />
      <ModalConfirm
        visible={isModalAlertAudio}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.permissionAudio')}
        mainButtonText="OK"
        onPressMain={(): void => setIsModalAlertAudio(false)}
        onPressClose={(): void => setIsModalAlertAudio(false)}
      />
      <TabView
        renderTabBar={(props): ReactNode => <MyDiaryTabBar {...props} />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(i: number): void => setIndex(i)}
        initialLayout={initialLayout}
      />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
