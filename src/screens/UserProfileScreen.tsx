import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import firebase from '../constants/firebase';
import { EmptyDiary, EmptyReview } from '../components/molecules';
import { Space, GrayHeader } from '../components/atoms';
import {
  Diary,
  Profile,
  UserReview,
  Review,
  BlockUser,
  Report as ReportType,
} from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor, linkBlue, fontSizeM } from '../styles/Common';
import Report from '../components/organisms/Report';
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

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary | Review, index: number): string =>
  String(index);

/**
 * ユーザページ
 */
const UserProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
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
  const [isBlocked, setIsBlocked] = useState(false);
  const [topReviews, setTopReviews] = useState<Review[]>([]);
  const [reviewNum, setReviewNum] = useState<number>();

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!navigation.state.params) return;
      const { uid } = navigation.state.params;
      const newProfile = await getProfile(uid);
      const newUserReivew = await getUserReview(uid);
      setProfile(newProfile);
      setUserReview(newUserReivew);
      setLoadingProfile(false);
    };
    f();
  }, [setProfile, setLoadingProfile, navigation]);

  const getNewDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        if (!navigation.state.params) return;
        try {
          const { uid } = navigation.state.params;
          const index = await Algolia.getDiaryIndex(clean);
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
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.other'));
        }
        setLoadingDiary(false);
      };
      f();
    },
    [navigation.state.params]
  );

  const getNewReview = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!navigation.state.params) return;
      const { uid } = navigation.state.params;
      const newReivews = await getTopReviews(uid);
      const newReviewNum = await getReviewNum(uid);
      setTopReviews(newReivews);
      setReviewNum(newReviewNum);
      setLoadingReview(false);
    };
    f();
  }, [navigation.state.params]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      const { params } = navigation.state;
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
      await Promise.all([getNewProfile(), getNewDiary(false), getNewReview()]);
    };
    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewDiary, getNewProfile, getNewReview]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary(true);
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          if (!navigation.state.params) return;
          const { uid } = navigation.state.params;
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
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.other'));
        }
      }
    };
    f();
  }, [diaries, navigation.state.params, page, readAllResults, readingNext]);

  const onPressBlock = useCallback(() => {
    setIsBlockSuccess(false);
    setIsModalBlock(true);
  }, []);

  const onPressReport = useCallback(() => {
    setIsReportSuccess(false);
    setIsReport(true);
  }, []);

  const onPressMore = () => {
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
  };

  useEffect(() => {
    navigation.setParams({ onPressMore });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressMoreReview = useCallback((): void => {
    if (!profile) return;
    navigation.navigate('ReviewList', { uid: profile.uid });
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
  }, [profile, setIsBlocked]);

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
          } as ReportType);
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

  const renderDiary = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
          onPressItem={(): void => {
            navigation.navigate('UserDiary', { item });
          }}
        />
      );
    },
    [navigation]
  );

  const renderReview = useCallback(
    ({ item }: { item: Review }): JSX.Element => {
      return (
        <ReviewListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
        />
      );
    },
    [navigation]
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
      <Report
        isReport={isReport}
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
          <ActivityIndicator />
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

UserProfileScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressMore = navigation.getParam('onPressMore');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('userProfile.headerTitle'),
    headerRight: (): JSX.Element => (
      <TouchableOpacity onPress={onPressMore}>
        <MaterialCommunityIcons
          size={28}
          color={primaryColor}
          name="dots-horizontal"
        />
      </TouchableOpacity>
    ),
  };
};

export default connectActionSheet(UserProfileScreen);
