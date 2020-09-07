import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import * as Notifications from 'expo-notifications';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { Subscription } from '@unimodules/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { GrayHeader, LoadingModal, HeaderRight } from '../components/atoms';
import { User, Diary, Profile } from '../types';
import DiaryListItem from '../components/organisms/DiaryListItem';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import MyDiaryListMenuWebPc from '../components/web/organisms/MyDiaryListMenu';
import EmptyMyDiaryList from '../components/organisms/EmptyMyDiaryList';
import SearchBarButton from '../components/molecules/SearchBarButton';
import Algolia from '../utils/Algolia';
import { updateUnread, updateYet } from '../utils/diary';
import ModalStillCorrecting from '../components/organisms/ModalStillCorrecting';
import { getUnreadCorrectionNum } from '../utils/localStatus';
import { LocalStatus } from '../types/localStatus';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import { getDataCorrectionStatus } from '../utils/correcting';
import ModalAppSuggestion from '../components/web/organisms/ModalAppSuggestion';
import {
  getExpoPushToken,
  registerForPushNotificationsAsync,
} from '../utils/Notification';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '../navigations/MyDiaryTabNavigator';

export interface Props {
  user: User;
  profile: Profile;
  diaries: Diary[];
  diaryTotalNum: number;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
  setDiaries: (diaries: Diary[]) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
}

type MyDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiaryList'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryListNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  flatList: {
    flex: 1,
  },
});

const HIT_PER_PAGE = 20;
const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: React.FC<ScreenType> = ({
  user,
  profile,
  diaries,
  diaryTotalNum,
  localStatus,
  editDiary,
  setUser,
  setDiaries,
  setDiaryTotalNum,
  setLocalStatus,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStillLoading, setIsStillLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const [correctingObjectID, setCorrectingObjectID] = useState(
    user.correctingObjectID
  );

  const onPressSearch = useCallback(() => {
    navigation.navigate('MyDiarySearch');
  }, [navigation]);

  // 第二引数をなしにするのがポイント
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (): JSX.Element => (
        <SearchBarButton
          title={I18n.t('myDiaryList.headerTitle')}
          onPress={onPressSearch}
        />
      ),
      headerRight: (): JSX.Element =>
        isDesktopOrLaptopDevice ? (
          <MyDiaryListMenuWebPc nativeLanguage={profile.nativeLanguage} />
        ) : (
            <HeaderRight
              name="dots-horizontal"
              onPress={(): void => setIsMenu(true)}
            />
          ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewDiary = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const index = await Algolia.getDiaryIndex();
        await Algolia.setSettings(index);
        const res = await index.search('', {
          filters: `profile.uid: ${user.uid} AND diaryStatus: publish`,
          page: 0,
          hitsPerPage: HIT_PER_PAGE,
        });

        const { hits, nbHits } = res;
        setDiaries(hits as Diary[]);
        setDiaryTotalNum(nbHits);

        // ユーザ情報も更新し直す（badgeのカウントの対応のため）
        const newUnreadCorrectionNum = await getUnreadCorrectionNum(user.uid);
        if (newUnreadCorrectionNum !== null) {
          Notifications.setBadgeCountAsync(newUnreadCorrectionNum);
          setLocalStatus({
            ...localStatus,
            unreadCorrectionNum: newUnreadCorrectionNum,
          });
        }
      } catch (err) {
        setIsLoading(false);
        setRefreshing(false);
        alert({ err });
      }
      setIsLoading(false);
    };
    f();
  }, [localStatus, setDiaries, setDiaryTotalNum, setLocalStatus, user.uid]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary();
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary();
      // expoへの登録
      const expoPushToken = await getExpoPushToken();
      if (expoPushToken && localStatus.uid) {
        // localStatusの方を使わないと初回登録時落ちる
        registerForPushNotificationsAsync(localStatus.uid, expoPushToken);
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      prm => {
        console.log('addNotificationReceivedListener', prm);
        onRefresh();
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log('addNotificationResponseReceivedListener', response);
        onRefresh();
      }
    );

    return (): void => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const nextPage = page + 1;
          setReadingNext(true);

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid} AND diaryStatus: publish`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });
          const { hits } = res;

          if (hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setDiaries([...diaries, ...(hits as Diary[])]);
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
  }, [diaries, page, readAllResults, readingNext, setDiaries, user.uid]);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressModalStill = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isStillLoading || !user.correctingObjectID) return;
      setIsStillLoading(true);
      // ステータスを戻す
      const data = getDataCorrectionStatus(user.correctingCorrectedNum, 'yet');
      if (!data) return;
      updateYet(user.correctingObjectID, user.uid, data);

      setUser({
        ...user,
        correctingObjectID: null,
        correctingCorrectedNum: null,
      });
      setIsStillLoading(false);
      setCorrectingObjectID(null);
    };
    f();
  }, [isStillLoading, setUser, user]);

  const onPressItem = useCallback(
    (item: Diary) => {
      const f = async (): Promise<void> => {
        if (!item.objectID) return;
        if (
          item.correctionStatus === 'unread' ||
          item.correctionStatus2 === 'unread' ||
          item.correctionStatus3 === 'unread'
        ) {
          // 未読の場合
          if (isLoading) return;
          setIsLoading(true);

          if (localStatus.unreadCorrectionNum) {
            const newUnreadCorrectionNum = localStatus.unreadCorrectionNum - 1;
            // アプリの通知数を設定
            Notifications.setBadgeCountAsync(newUnreadCorrectionNum);
            setLocalStatus({
              ...localStatus,
              unreadCorrectionNum: newUnreadCorrectionNum,
            });
          }

          const data = {
            correctionStatus:
              item.correctionStatus === 'unread'
                ? 'done'
                : item.correctionStatus,
            correctionStatus2:
              item.correctionStatus2 === 'unread'
                ? 'done'
                : item.correctionStatus2,
            correctionStatus3:
              item.correctionStatus3 === 'unread'
                ? 'done'
                : item.correctionStatus3,
          };
          // DBを更新
          await updateUnread(item.objectID, data);
          // reduxを更新
          editDiary(item.objectID, {
            ...item,
            ...data,
          });

          setIsLoading(false);
        }
        navigation.navigate('MyDiary', { objectID: item.objectID });
      };
      f();
    },
    [editDiary, isLoading, localStatus, navigation, setLocalStatus]
  );

  type RenderItemProps = { item: Diary };
  const renderItem = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <DiaryListItem
          mine
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
          onPressItem={onPressItem}
        />
      );
    },
    [navigation, onPressItem]
  );

  const listHeaderComponent = useCallback(() => {
    return (
      <GrayHeader
        title={I18n.t('myDiaryList.diaryList', { count: diaryTotalNum })}
      />
    );
  }, [diaryTotalNum]);

  const isEmpty = !isLoading && !refreshing && diaries.length < 1;
  const ListEmptyComponent = useCallback(() => {
    if (isEmpty) {
      return <EmptyMyDiaryList />;
    }
    return null;
  }, [isEmpty]);

  return (
    <View style={styles.container}>
      <MyDiaryListMenu
        isMenu={isMenu}
        nativeLanguage={profile.nativeLanguage}
        onClose={onClose}
      />
      <LoadingModal visible={isLoading} />
      <ModalStillCorrecting
        visible={!!correctingObjectID}
        isLoading={isStillLoading}
        onPress={onPressModalStill}
      />
      <ModalAppSuggestion user={user} />
      <FlatList
        // emptyの時のレイアウトのため
        contentContainerStyle={isEmpty ? styles.flatList : null}
        data={diaries}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default MyDiaryListScreen;
