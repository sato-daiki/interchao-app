import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import Algolia from '../utils/Algolia';
import { Profile, Diary, Correction, User } from '../types';
import DiaryCommon from '../components/organisms/DiaryCommon';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { getCorrection } from '../utils/corrections';
import I18n from '../utils/I18n';
import { getProfile } from '../utils/profile';
import { onStatusCheck } from '../utils/diary';

const { width } = Dimensions.get('window');

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    width: width - 144,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
});

/**
 * 日記詳細
 */
const UserDiaryScreen: ScreenType = ({
  user,
  profile,
  setUser,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isDiaryLoading, setIsDiaryLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [isModalCorrection, setIsModalCorrection] = useState(false);
  const [teachDiary, setTeachDiary] = useState<Diary>();
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();

  const getNewProfile = useCallback((diary: Diary) => {
    const f = async (): Promise<void> => {
      if (!diary) return;
      const newProfile = await getProfile(diary.profile.uid);
      if (newProfile) {
        setTargetProfile(newProfile);
      }
      setIsProfileLoading(false);
    };
    f();
  }, []);

  const getNewCorrection = useCallback((diary: Diary) => {
    const f = async (): Promise<void> => {
      if (!diary) return;
      if (diary.correction) {
        const newCorrection = await getCorrection(diary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (diary.correction2) {
        const newCorrection = await getCorrection(diary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      if (diary.correction3) {
        const newCorrection = await getCorrection(diary.correction3.id);
        if (newCorrection) {
          setCorrection3(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, []);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const { params = {} } = navigation.state;
      const { objectID } = params;
      if (!objectID) {
        setIsDiaryLoading(false);
        return;
      }

      // 日記を取得
      const index = await Algolia.getDiaryIndex();
      const res = await index.search('', {
        filters: `objectID: ${objectID}`,
        page: 0,
        hitsPerPage: 1,
      });
      if (res.nbHits !== 1) {
        setIsDiaryLoading(false);
        return;
      }
      const diary = res.hits[0] as Diary;
      setTeachDiary(diary);
      setIsDiaryLoading(false);
      // プロフィールを取得
      await Promise.all([getNewProfile(diary), getNewCorrection(diary)]);
    };
    f();
  }, [
    getNewCorrection,
    getNewProfile,
    navigation.state,
    navigation.state.params,
  ]);

  const setRedux = useCallback(
    (userInfo, diaryInfo): void => {
      setUser(userInfo);
    },
    [setUser]
  );

  const goToCorrecting = useCallback((): void => {
    if (!teachDiary) return;
    navigation.navigate('UserCorrecting', {
      teachDiary,
    });
  }, [navigation, teachDiary]);

  const onPressSubmitCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      await onStatusCheck(
        isLoading,
        user,
        teachDiary,
        goToCorrecting,
        setIsModalCorrection,
        setIsLoading,
        setRedux
      );
    };
    f();
  }, [goToCorrecting, isLoading, setRedux, teachDiary, user]);

  const onPressCorrection = useCallback(() => {
    setIsModalCorrection(true);
  }, []);

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.push('UserProfile', { uid });
    },
    [navigation]
  );

  return (
    <DiaryCommon
      isLoading={isLoading}
      isModalCorrection={isModalCorrection}
      isDiaryLoading={isDiaryLoading}
      isProfileLoading={isProfileLoading}
      isCorrectionLoading={isCorrectionLoading}
      user={user}
      targetProfile={targetProfile}
      teachDiary={teachDiary}
      profile={profile}
      correction={correction}
      correction2={correction2}
      correction3={correction3}
      onPressClose={(): void => setIsModalCorrection(false)}
      onPressUser={onPressUser}
      onPressCorrection={onPressCorrection}
      onPressSubmitCorrection={onPressSubmitCorrection}
    />
  );
};

UserDiaryScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('teachDiary.headerTitle'),
    headerTitleStyle: styles.headerTitleStyle,
  };
};

export default UserDiaryScreen;
