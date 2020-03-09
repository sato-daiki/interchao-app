import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { EmptyDiary } from '../components/molecules';
import { GrayHeader, ProfileIconHorizontal, Space } from '../components/atoms';
import { Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor, fontSizeM } from '../styles/Common';
import Report from '../components/organisms/Report';
import { getProfile } from '../utils/profile';
import Algolia from '../utils/Algolia';
import DiaryListItem from '../components/organisms/DiaryListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  name: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  introduction: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * ユーザページ
 */
const UserProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isReport, setIsReport] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingDiary, setLoadingDiary] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [profile, setProfile] = useState();
  const [diaries, setDiaries] = useState();
  const [diaryTotalNum, setDiaryTotalNum] = useState(0);

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      const { uid } = navigation.state.params!;
      const newProfile = await getProfile(uid);
      setProfile(newProfile);
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
      await Promise.all([getNewProfile(), getNewDiary(false)]);
    };
    f();
  }, [getProfile, getNewDiary]);

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
  }, [diaries, page, readAllResults, readingNext, setDiaries]);

  const onPressUser = useCallback(() => {}, []);

  const closePanel = useCallback(() => {
    setIsReport(false);
  }, []);

  const onPressBlock = useCallback(() => {
    navigation.navigate('Block');
  }, [navigation]);

  const onPressReport = useCallback(() => {
    setIsReport(true);
  }, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('UserDiary', { item });
    },
    [navigation]
  );

  const onPressMore = useCallback(() => {
    const options = ['ブロック', '報告する', 'キャンセル'];
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

  const listHeaderComponent = (
    <>
      <View style={styles.profileContainer}>
        {loadingProfile ? (
          <ActivityIndicator />
        ) : (
          <>
            <ProfileIconHorizontal
              userName={profile.userName}
              photoUrl={profile.photoUrl}
            />
            {profile.name ? (
              <>
                <Space size={16} />
                <Text style={styles.name}>{profile.name}</Text>
              </>
            ) : null}
            <Text style={styles.introduction}>{profile.introduction}</Text>
          </>
        )}
      </View>
      <GrayHeader
        title={
          diaryTotalNum !== 0 ? `日記一覧(${diaryTotalNum}件)` : '日記一覧'
        }
      />
    </>
  );

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
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  return (
    <View style={styles.container}>
      <Report isReport={isReport} closePanel={closePanel} />
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
