import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
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
import { EmptyDiary } from '../components/molecules';
import { Space } from '../components/atoms';
import { Diary, Profile, UserReview } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor } from '../styles/Common';
import Report from '../components/organisms/Report';
import { getProfile } from '../utils/profile';
import Algolia from '../utils/Algolia';
import DiaryListItem from '../components/organisms/DiaryListItem';
import { ModalBlock, ModalConfirm } from '../components/organisms';
import { checkBlockee, checkBlocker } from '../utils/blockUser';
import { getUserReview } from '../utils/userReview';
import UserProfileHeader from '../components/organisms/UserProfileHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary, index: number): string => String(index);

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
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();
  const [userReview, setUserReview] = useState<UserReview | null>();
  const [diaries, setDiaries] = useState<Diary[] | null | undefined>();
  const [diaryTotalNum, setDiaryTotalNum] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      const { uid } = navigation.state.params!;
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
        try {
          const { uid } = navigation.state.params!;
          const index = await Algolia.getDiaryIndex(clean);
          await Algolia.setSettings(index);
          const res = await index.search('', {
            filters: `profile.uid: ${uid} AND diaryStatus: publish`,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });

          setDiaries(res.hits);
          setDiaryTotalNum(res.nbHits);
        } catch (err) {
          setLoadingDiary(false);
          setRefreshing(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
        setLoadingDiary(false);
      };
      f();
    },
    [setDiaries, setDiaryTotalNum]
  );

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
      await Promise.all([getNewProfile(), getNewDiary(false)]);
    };
    f();
  }, [getNewDiary, getNewProfile]);

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
          const { uid } = navigation.state.params!;
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
            setDiaries([...diaries, ...res.hits]);
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
      }
    };
    f();
  }, [diaries, page, readAllResults, readingNext]);

  const onPressBlock = useCallback(() => {
    setIsModalBlock(true);
  }, [navigation]);

  const onPressReport = useCallback(() => {
    setIsReportSuccess(false);
    setIsReport(true);
  }, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('UserDiary', { item });
    },
    [navigation]
  );

  const onPressMore = useCallback(() => {
    const options = [
      !isBlocked ? 'ブロック' : 'ブロックを解除する',
      '報告する',
      'キャンセル',
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
  }, [onPressBlock, onPressReport, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setParams({ onPressMore });
  }, []);

  const onPressBlockSubmit = useCallback((): void => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      if (!currentUser || !profile) {
        return;
      }
      setIsLoading(true);
      await firebase
        .firestore()
        .collection(`blockUsers`)
        .add({
          blockerUid: currentUser.uid,
          blockeeUid: profile.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
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
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setIsLoading(false);
        setIsReportSuccess(true);
      };
      f();
    },
    [profile]
  );

  const listHeaderComponent = (): JSX.Element | null => {
    if (!profile) return null;
    return (
      <UserProfileHeader
        loadingProfile={loadingProfile}
        profile={profile}
        userReview={userReview}
        diaryTotalNum={diaryTotalNum}
      />
    );
  };

  const listEmptyComponent = loadingDiary || refreshing ? null : <EmptyDiary />;

  const listFooterComponent =
    loadingDiary && !refreshing ? (
      <>
        <Space size={16} />
        <ActivityIndicator />
      </>
    ) : null;

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem]
  );

  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalDeleted}
        title="エラー"
        message="このページは開けません。対象のユーザは削除された可能性があります。"
        cancelButtonText="閉じる"
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
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={listFooterComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

UserProfileScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressMore = navigation.getParam('onPressMore');
  return {
    ...DefaultNavigationOptions,
    title: 'プロフィール',
    headerRight: (): JSX.Element => (
      <MaterialCommunityIcons
        size={28}
        color={primaryColor}
        name="dots-horizontal"
        onPress={onPressMore}
      />
    ),
  };
};

export default connectActionSheet(UserProfileScreen);
