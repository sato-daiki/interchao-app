import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import { EmptyDiary, EmptyReview } from '../components/molecules';
import { Space, GrayHeader, HeaderRight } from '../components/atoms';
import {
  Diary,
  Profile,
  UserReview,
  Review,
  BlockUser,
  Report,
} from '../types';
import { linkBlue, fontSizeM } from '../styles/Common';
import { getProfile } from '../utils/profile';
import Algolia from '../utils/Algolia';
import DiaryListItem from '../components/organisms/DiaryListItem';
import { ModalBlock, ModalConfirm } from '../components/organisms';
import { checkBlockee, checkBlocker } from '../utils/blockUser';
import { getUserReview } from '../utils/userReview';
import UserProfileHeader from '../components/organisms/UserProfileHeader';
import { getTopReviews, getReviewNum } from '../utils/review';
import ReviewListItem from '../components/organisms/ReviewListItem';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import UserProfileMenu from '../components/web/organisms/UserProfileMenu';
import ModalReport from '../components/web/organisms/ModalReport';
import {
  CommonStackParamList,
  CommonNavigationProp,
} from '../navigations/CommonNavigator';

type UserProfileNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CommonStackParamList, 'UserProfile'>,
  CommonNavigationProp
>;

type UserProfileRouteProp = RouteProp<CommonStackParamList, 'UserProfile'>;

type ScreenType = {
  navigation: UserProfileNavigationProp;
  route: UserProfileRouteProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  moreRead: {
    marginTop: 16,
    marginBottom: 32,
    paddingRight: 16,
  },
  moreReadText: {
    color: linkBlue,
    fontSize: fontSizeM,
    textAlign: 'right',
  },
});

const HIT_PER_PAGE = 10;

const keyExtractor = (item: Diary | Review, index: number): string =>
  String(index);

/**
 * ユーザページ
 */
const UserProfileScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockSuccess, setIsBlockSuccess] = useState(false);
  const [isReportSuccess, setIsReportSuccess] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [isModalDeleted, setIsModalDeleted] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingDiary, setLoadingDiary] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();
  const [userReview, setUserReview] = useState<UserReview | null>();
  const [diaries, setDiaries] = useState<Diary[] | null | undefined>();
  const [diaryTotalNum, setDiaryTotalNum] = useState(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [topReviews, setTopReviews] = useState<Review[]>([]);
  const [reviewNum, setReviewNum] = useState<number>();

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      const { uid } = route.params;
      const newProfile = await getProfile(uid);
      const newUserReivew = await getUserReview(uid);
      setProfile(newProfile);
      setUserReview(newUserReivew);
      setLoadingProfile(false);
    };
    f();
  }, [route.params]);

  const getNewDiary = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { uid } = route.params;
        const index = await Algolia.getDiaryIndex();
        await Algolia.setSettings(index);
        const res = await index.search('', {
          filters: `profile.uid: ${uid} AND diaryStatus: publish`,
          page: 0,
          hitsPerPage: HIT_PER_PAGE,
        });

        setDiaries(res.hits as Diary[]);
        setDiaryTotalNum(res.nbHits);
      } catch (err) {
        setLoadingDiary(false);
        setRefreshing(false);
        alert({ err });
      }
      setLoadingDiary(false);
    };
    f();
  }, [route.params]);

  const getNewReview = useCallback(() => {
    const f = async (): Promise<void> => {
      const { uid } = route.params;
      const newReivews = await getTopReviews(uid);
      const newReviewNum = await getReviewNum(uid);
      setTopReviews(newReivews);
      setReviewNum(newReviewNum);
      setLoadingReview(false);
    };
    f();
  }, [route.params]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      const { params } = route;
      if (!currentUser || !params) return;

      // ブロックされているかのチェック
      const resBlockee = await checkBlockee(currentUser.uid, params.uid);
      if (resBlockee) {
        setIsModalDeleted(true);
        setLoadingProfile(false);
        setLoadingDiary(false);
        return;
      }

      // ブロックしているかのチェック
      const resBlocker = await checkBlocker(currentUser.uid, params.uid);
      setIsBlocked(resBlocker);
      // データを取得していく
      await Promise.all([getNewProfile(), getNewDiary(), getNewReview()]);
    };
    f();
  }, [getNewDiary, getNewProfile, getNewReview, route]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary();
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const { uid } = route.params;
          const nextPage = page + 1;
          setReadingNext(true);

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: `profile.uid: ${uid} AND diaryStatus: publish`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            if (diaries) {
              setDiaries([...diaries, ...(res.hits as Diary[])]);
            }
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          alert({ err });
        }
      }
    };
    f();
  }, [diaries, route.params, page, readAllResults, readingNext]);

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
      isBlocked
        ? I18n.t('userProfile.unBlocked')
        : I18n.t('userProfile.blocked'),
      I18n.t('userProfile.report'),
      I18n.t('common.cancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
      },
      index => {
        switch (index) {
          case 0:
            onPressBlock();
            break;
          case 1:
            onPressReport();
            break;
          default:
        }
      }
    );
  }, [isBlocked, onPressBlock, onPressReport, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): JSX.Element =>
        isDesktopOrLaptopDevice ? (
          <UserProfileMenu
            isBlocked={isBlocked}
            onPressReport={onPressReport}
            onPressBlock={onPressBlock}
          />
        ) : (
          <HeaderRight name="dots-horizontal" onPress={onPressMore} />
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlocked]);

  const onPressMoreReview = useCallback((): void => {
    if (!profile) return;
    navigation.push('ReviewList', {
      uid: profile.uid,
      userName: profile.userName,
    });
  }, [navigation, profile]);

  const onPressBlockSubmit = useCallback((): void => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      if (!currentUser || !profile) {
        return;
      }
      setIsLoading(true);
      const newBlockUser = {
        blockerUid: currentUser.uid,
        blockeeUid: profile.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as BlockUser;
      await firebase
        .firestore()
        .collection(`blockUsers`)
        .add(newBlockUser);
      setIsBlockSuccess(true);
      setIsLoading(false);
      setIsBlocked(true);
    };
    f();
  }, [profile]);

  const onPressUnblockSubmit = useCallback((): void => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      if (!currentUser || !profile) {
        return;
      }
      setIsLoading(true);
      // １データしか存在しない
      const users = await firebase
        .firestore()
        .collection(`blockUsers`)
        .where('blockerUid', '==', currentUser.uid)
        .where('blockeeUid', '==', profile.uid)
        .get();

      const batch = firebase.firestore().batch();
      users.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      setIsBlockSuccess(true);
      setIsLoading(false);
      setIsBlocked(false);
    };
    f();
  }, [profile]);

  const onPressCloseDeleted = useCallback(() => {
    setIsModalDeleted(false);
    navigation.goBack();
  }, [navigation]);

  const onReportSubmit = useCallback(
    (reason: string) => {
      const f = async (): Promise<void> => {
        const { currentUser } = firebase.auth();
        if (!currentUser || !profile) {
          return;
        }
        setIsLoading(true);
        await firebase
          .firestore()
          .collection(`reports`)
          .add({
            uid: currentUser.uid,
            targetUid: profile.uid,
            reason,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as Report);
        setIsLoading(false);
        setIsReportSuccess(true);
      };
      f();
    },
    [profile]
  );

  const listEmptyDiaryComponent =
    loadingDiary || refreshing ? null : <EmptyDiary />;

  const listEmptyReviewComponent =
    loadingReview || refreshing ? null : <EmptyReview />;

  const listHeaderDiaryComponent = (
    <GrayHeader
      title={I18n.t('userProfile.diaryList', { count: diaryTotalNum })}
    />
  );

  const listHeaderReviewComponent = (
    <GrayHeader title={I18n.t('userProfile.topReview')} />
  );

  const listFooterDiaryComponent =
    loadingDiary && !refreshing ? (
      <>
        <Space size={16} />
        <ActivityIndicator />
        <Space size={16} />
      </>
    ) : null;

  const listFooterReviewComponent =
    loadingReview && !refreshing ? (
      <>
        <Space size={16} />
        <ActivityIndicator />
        <Space size={16} />
      </>
    ) : null;

  type RenderItemProps = { item: Diary };
  const renderDiary = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <DiaryListItem
          item={item}
          onPressUser={(uid: string, userName: string): void => {
            navigation.push('UserProfile', { uid, userName });
          }}
          onPressItem={(): void => {
            if (!item.objectID) return;
            navigation.push('UserDiary', {
              objectID: item.objectID,
              userName: item.profile.userName,
            });
          }}
        />
      );
    },
    [navigation]
  );

  type RenderReviewProps = { item: Review };
  const renderReview = useCallback(
    ({ item }: RenderReviewProps): JSX.Element | null => {
      if (profile) {
        return (
          <ReviewListItem
            item={item}
            textLanguage={profile.learnLanguage}
            onPressUser={(uid: string, userName: string): void => {
              navigation.push('UserProfile', { uid, userName });
            }}
          />
        );
      }
      return null;
    },
    [navigation, profile]
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
        onPressClose={(): void => setIsModalBlock(false)}
      />
      <ModalReport
        visible={isReport}
        isSuccess={isReportSuccess}
        isLoading={isLoading}
        onReportSubmit={onReportSubmit}
        onReportClose={(): void => setIsReport(false)}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {profile && !loadingProfile ? (
          <UserProfileHeader profile={profile} userReview={userReview} />
        ) : (
          <>
            <Space size={16} />
            <ActivityIndicator />
            <Space size={16} />
          </>
        )}
        <FlatList
          data={topReviews}
          keyExtractor={keyExtractor}
          renderItem={renderReview}
          ListHeaderComponent={listHeaderReviewComponent}
          ListEmptyComponent={listEmptyReviewComponent}
          ListFooterComponent={listFooterReviewComponent}
        />
        {!!reviewNum && reviewNum > 3 ? (
          <TouchableOpacity style={styles.moreRead} onPress={onPressMoreReview}>
            <Text style={styles.moreReadText}>
              {I18n.t('userProfile.moreRead', { count: reviewNum })}
            </Text>
          </TouchableOpacity>
        ) : null}
        <FlatList
          data={diaries}
          keyExtractor={keyExtractor}
          renderItem={renderDiary}
          ListHeaderComponent={listHeaderDiaryComponent}
          ListEmptyComponent={listEmptyDiaryComponent}
          ListFooterComponent={listFooterDiaryComponent}
          onEndReached={loadNextPage}
        />
      </ScrollView>
    </View>
  );
};

export default connectActionSheet(UserProfileScreen);
