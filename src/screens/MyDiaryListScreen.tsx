import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { Subscription } from '@unimodules/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import MyDiaryListFlatList from '@/components/organisms/MyDiaryList/MyDiaryListFlatList';
import MyDiaryListCalendar from '@/components/organisms/MyDiaryList/MyDiaryListCalendar';
import { LoadingModal, HeaderIcon } from '@/components/atoms';
import FirstPageComponents from '@/components/organisms/FirstPageComponents';
import MyDiaryListMenu from '@/components/organisms/MyDiaryListMenu';
import MyDiaryListMenuWebPc from '@/components/web/organisms/MyDiaryListMenu';
import SearchBarButton from '@/components/molecules/SearchBarButton';
import Algolia from '@/utils/Algolia';
import { updateUnread } from '@/utils/diary';
import { getUnreadCorrectionNum } from '@/utils/localStatus';
import { LocalStatus } from '@/types/localStatus';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import {
  getExpoPushToken,
  registerForPushNotificationsAsync,
} from '@/utils/Notification';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '@/navigations/MyDiaryTabNavigator';
import { User, Diary, Profile } from '../types';

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
});

const HIT_PER_PAGE = 20;

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
  const [refreshing, setRefreshing] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const page = useRef<number>(0);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const onPressSearch = useCallback(() => {
    navigation.navigate('MyDiarySearch');
  }, [navigation]);

  // 第二引数をなしにするのがポイント
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (): JSX.Element => (
        <SearchBarButton
          title={I18n.t('myDiaryList.searchText')}
          onPress={onPressSearch}
        />
      ),
      headerRight: (): JSX.Element =>
        isDesktopOrLaptopDevice ? (
          <MyDiaryListMenuWebPc nativeLanguage={profile.nativeLanguage} />
        ) : (
          <HeaderIcon
            icon="community"
            name="dots-horizontal"
            onPress={(): void => setIsMenu(true)}
          />
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewDiary = useCallback(async (): Promise<void> => {
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
  }, [localStatus, setDiaries, setDiaryTotalNum, setLocalStatus, user.uid]);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    await getNewDiary();
    setRefreshing(false);
  }, [getNewDiary]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary();
      // expoへの登録
      const expoPushToken = await getExpoPushToken();
      if (expoPushToken && localStatus.uid) {
        // localStatusの方を使わないと初回登録時落ちる
        await registerForPushNotificationsAsync(localStatus.uid, expoPushToken);
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener(
    //   prm => {
    //     console.log('[usePushNotification] catched notification', prm);
    //     onRefresh();
    //   }
    // );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log('[usePushNotification] catched notificationRes', response);
        onRefresh();
      }
    );

    return (): void => {
      // if (notificationListener.current) {
      //   Notifications.removeNotificationSubscription(
      //     notificationListener.current
      //   );
      // }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (!readingNext.current && !readAllResults.current) {
      try {
        const nextPage = page.current + 1;
        readingNext.current = true;

        const index = await Algolia.getDiaryIndex();
        const res = await index.search('', {
          filters: `profile.uid: ${user.uid} AND diaryStatus: publish`,
          page: nextPage,
          hitsPerPage: HIT_PER_PAGE,
        });
        const { hits } = res;

        if (hits.length === 0) {
          readAllResults.current = true;
          readingNext.current = false;
        } else {
          setDiaries([...diaries, ...(hits as Diary[])]);
          page.current = nextPage;
          readingNext.current = false;
        }
      } catch (err) {
        readingNext.current = false;
        alert({ err });
      }
    }
  }, [diaries, setDiaries, user.uid]);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressItem = useCallback(
    async (item: Diary): Promise<void> => {
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
            item.correctionStatus === 'unread' ? 'done' : item.correctionStatus,
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
      navigation.navigate('MyDiary', {
        objectID: item.objectID,
        userName: profile.userName,
      });
    },
    [
      editDiary,
      isLoading,
      localStatus,
      navigation,
      profile.userName,
      setLocalStatus,
    ]
  );

  const onPressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.navigate('UserProfile', { userName });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <MyDiaryListMenu
        isMenu={isMenu}
        nativeLanguage={profile.nativeLanguage}
        onClose={onClose}
      />
      <FirstPageComponents user={user} setUser={setUser} />
      {'aaa' === 'aaa' ? (
        <MyDiaryListCalendar />
      ) : (
        <MyDiaryListFlatList
          // emptyの時のレイアウトのため
          isEmpty={!isLoading && !refreshing && diaries.length < 1}
          refreshing={refreshing}
          diaries={diaries}
          diaryTotalNum={diaryTotalNum}
          loadNextPage={loadNextPage}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default MyDiaryListScreen;
