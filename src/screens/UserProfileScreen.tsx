import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { connectActionSheet, useActionSheet } from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import UserProfileHeader from '@/components/organisms/UserProfileHeader';
import { ModalBlock, ModalConfirm } from '@/components/organisms';
import DiaryListItem from '@/components/organisms/DiaryListItem';
import TopReviewList from '@/components/organisms/TopReviewList';
import UserProfileMenu from '@/components/web/organisms/UserProfileMenu';
import ModalReport from '@/components/web/organisms/ModalReport';
import { EmptyDiary } from '@/components/molecules';
import { Space, GrayHeader, HeaderIcon } from '@/components/atoms';

import firebase from '@/constants/firebase';
import { Diary, Profile, UserReview, Review, BlockUser, Report, User } from '@/types';
import { getProfile, getUid } from '@/utils/profile';
import Algolia from '@/utils/Algolia';
import { checkBlockee, checkBlocker } from '@/utils/blockUser';
import { getUserReview } from '@/utils/userReview';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import { CommonStackParamList, CommonNavigationProp } from '@/navigations/CommonNavigator';

export interface Props {
  user: User;
}

type UserProfileNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CommonStackParamList, 'UserProfile'>,
  CommonNavigationProp
>;

type UserProfileRouteProp = RouteProp<CommonStackParamList, 'UserProfile'>;

type ScreenType = {
  navigation: UserProfileNavigationProp;
  route: UserProfileRouteProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary | Review, index: number): string => String(index);

/**
 * ユーザページ
 */
const UserProfileScreen: React.FC<ScreenType> = ({ navigation, route, user }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockSuccess, setIsBlockSuccess] = useState(false);
  const [isReportSuccess, setIsReportSuccess] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [isModalDeleted, setIsModalDeleted] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingDiary, setLoadingDiary] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();
  const [userReview, setUserReview] = useState<UserReview | null>();
  const [diaries, setDiaries] = useState<Diary[] | null | undefined>();
  const [diaryTotalNum, setDiaryTotalNum] = useState(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const page = useRef<number>(0);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const getNewProfile = useCallback((targetUid: string) => {
    const f = async (): Promise<void> => {
      const newProfile = await getProfile(targetUid);
      const newUserReivew = await getUserReview(targetUid);
      setProfile(newProfile);
      setUserReview(newUserReivew);
      setLoadingProfile(false);
    };
    f();
  }, []);

  const getNewDiary = useCallback(async (targetUid: string): Promise<void> => {
    try {
      const index = await Algolia.getDiaryIndex();
      await Algolia.setSettings(index);
      const res = await index.search('', {
        filters: `profile.uid: ${targetUid} AND diaryStatus: publish`,
        page: 0,
        hitsPerPage: HIT_PER_PAGE,
      });

      setDiaries(res.hits as Diary[]);
      setDiaryTotalNum(res.nbHits);
    } catch (err: any) {
      setLoadingDiary(false);
      setRefreshing(false);
      alert({ err });
    }
    setLoadingDiary(false);
  }, []);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const targetUid = await getUid(route.params.userName);
      if (!targetUid) {
        setIsModalDeleted(true);
        setLoadingProfile(false);
        setLoadingDiary(false);
        return;
      }

      // ブロックされているかのチェック
      const resBlockee = await checkBlockee(user.uid, targetUid);
      if (resBlockee) {
        setIsModalDeleted(true);
        setLoadingProfile(false);
        setLoadingDiary(false);
        return;
      }

      // ブロックしているかのチェック
      const resBlocker = await checkBlocker(user.uid, targetUid);
      setIsBlocked(resBlocker);
      // データを取得していく

      await Promise.all([getNewProfile(targetUid), getNewDiary(targetUid)]);
    };
    f();
  }, [getNewDiary, getNewProfile, route.params.userName, user.uid]);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    if (!profile) {
      setRefreshing(false);
      return;
    }
    await getNewDiary(profile.uid);
    setRefreshing(false);
  }, [getNewDiary, profile]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (!readingNext.current && !readAllResults.current && profile) {
      try {
        const nextPage = page.current + 1;
        readingNext.current = true;

        const index = await Algolia.getDiaryIndex();
        const res = await index.search('', {
          filters: `profile.uid: ${profile.uid} AND diaryStatus: publish`,
          page: nextPage,
          hitsPerPage: HIT_PER_PAGE,
        });

        if (res.hits.length === 0) {
          readAllResults.current = true;
          readingNext.current = false;
        } else {
          if (diaries) {
            setDiaries([...diaries, ...(res.hits as Diary[])]);
          }
          page.current = nextPage;
          readingNext.current = false;
        }
      } catch (err: any) {
        readingNext.current = false;
        alert({ err });
      }
    }
  }, [profile, diaries]);

  const onPressBlock = useCallback(() => {
    setIsBlockSuccess(false);
    setIsModalBlock(true);
  }, []);

  const onPressReport = useCallback(() => {
    setIsReportSuccess(false);
    setIsReport(true);
  }, []);

  const onPressMore = useCallback(() => {
    const options = [
      isBlocked ? I18n.t('userProfile.unBlocked') : I18n.t('userProfile.blocked'),
      I18n.t('userProfile.report'),
      I18n.t('common.cancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
      },
      (index) => {
        switch (index) {
          case 0:
            onPressBlock();
            break;
          case 1:
            onPressReport();
            break;
          default:
        }
      },
    );
  }, [isBlocked, onPressBlock, onPressReport, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isDesktopOrLaptopDevice ? (
          <UserProfileMenu
            isBlocked={isBlocked}
            onPressReport={onPressReport}
            onPressBlock={onPressBlock}
          />
        ) : (
          <HeaderIcon icon='community' name='dots-horizontal' onPress={onPressMore} />
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlocked]);

  const onPressMoreReview = useCallback((): void => {
    if (!profile) return;
    navigation.push('ReviewList', {
      userName: profile.userName,
    });
  }, [navigation, profile]);

  const onPressBlockSubmit = useCallback(async (): Promise<void> => {
    if (!profile) {
      return;
    }
    setIsLoading(true);
    const newBlockUser = {
      blockerUid: user.uid,
      blockeeUid: profile.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as BlockUser;
    await firebase.firestore().collection('blockUsers').add(newBlockUser);
    setIsBlockSuccess(true);
    setIsLoading(false);
    setIsBlocked(true);
  }, [profile, user.uid]);

  const onPressUnblockSubmit = useCallback(async (): Promise<void> => {
    if (!profile) {
      return;
    }
    setIsLoading(true);
    // １データしか存在しない
    const users = await firebase
      .firestore()
      .collection('blockUsers')
      .where('blockerUid', '==', user.uid)
      .where('blockeeUid', '==', profile.uid)
      .get();

    const batch = firebase.firestore().batch();
    users.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    setIsBlockSuccess(true);
    setIsLoading(false);
    setIsBlocked(false);
  }, [profile, user.uid]);

  const onPressCloseDeleted = useCallback(() => {
    setIsModalDeleted(false);
    navigation.goBack();
  }, [navigation]);

  const onReportSubmit = useCallback(
    async (reason: string): Promise<void> => {
      if (!profile) {
        return;
      }
      setIsLoading(true);
      await firebase
        .firestore()
        .collection('reports')
        .add({
          uid: user.uid,
          targetUid: profile.uid,
          reason,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        } as Report);
      setIsLoading(false);
      setIsReportSuccess(true);
    },
    [profile, user.uid],
  );

  const handlePressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.navigate('UserProfile', { userName });
    },
    [navigation],
  );

  const onPressItem = useCallback(
    (item: Diary) => {
      if (!item.objectID) return;
      navigation.push('UserDiary', {
        objectID: item.objectID,
        userName: item.profile.userName,
      });
    },
    [navigation],
  );

  const onPressCloseReport = useCallback(() => {
    setIsReport(false);
  }, []);

  const onPressCloseModalBlock = useCallback(() => {
    setIsModalBlock(false);
  }, []);

  const listEmptyDiaryComponent = loadingDiary || refreshing ? null : <EmptyDiary />;

  const listHeaderDiaryComponent = useMemo(
    () => (
      <>
        <Space size={32} />
        {profile && !loadingProfile ? (
          <UserProfileHeader profile={profile} userReview={userReview} />
        ) : (
          <>
            <Space size={16} />
            <ActivityIndicator />
            <Space size={16} />
          </>
        )}
        <TopReviewList
          profile={profile}
          userName={route.params.userName}
          refreshing={refreshing}
          handlePressUser={handlePressUser}
          onPressMoreReview={onPressMoreReview}
        />
        <GrayHeader title={I18n.t('userProfile.diaryList', { count: diaryTotalNum })} />
      </>
    ),
    [
      diaryTotalNum,
      handlePressUser,
      loadingProfile,
      onPressMoreReview,
      profile,
      refreshing,
      route.params.userName,
      userReview,
    ],
  );

  const listFooterDiaryComponent = useMemo(
    () =>
      loadingDiary && !refreshing ? (
        <>
          <Space size={16} />
          <ActivityIndicator />
          <Space size={16} />
        </>
      ) : null,
    [loadingDiary, refreshing],
  );

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
    [onRefresh, refreshing],
  );

  const renderDiary: ListRenderItem<Diary> = useCallback(
    ({ item }) => {
      return <DiaryListItem item={item} onPressUser={handlePressUser} onPressItem={onPressItem} />;
    },
    [handlePressUser, onPressItem],
  );

  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalDeleted}
        title={I18n.t('common.error')}
        message={I18n.t('errorMessage.deleteTargetUser')}
        cancelButtonText={I18n.t('common.close')}
        onPressClose={onPressCloseDeleted}
      />
      <ModalBlock
        visible={isModalBlock}
        isBlocked={isBlocked}
        isSuccess={isBlockSuccess}
        isLoading={isLoading}
        userName={profile ? profile.userName : ''}
        onPressSubmit={!isBlocked ? onPressBlockSubmit : onPressUnblockSubmit}
        onPressClose={onPressCloseModalBlock}
      />
      <ModalReport
        visible={isReport}
        isSuccess={isReportSuccess}
        isLoading={isLoading}
        onReportSubmit={onReportSubmit}
        onReportClose={onPressCloseReport}
      />
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderDiary}
        ListHeaderComponent={listHeaderDiaryComponent}
        ListEmptyComponent={listEmptyDiaryComponent}
        ListFooterComponent={listFooterDiaryComponent}
        onEndReached={loadNextPage}
        refreshControl={refreshControl}
      />
    </View>
  );
};

export default connectActionSheet(UserProfileScreen);
