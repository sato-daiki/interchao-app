import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { Diary, User, Profile } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { getCorrection } from '../utils/corrections';
import { Correction } from '../types/correction';
import { getProfile } from '../utils/profile';
import DiaryCommon from '../components/organisms/DiaryCommon';
import { onStatusCheck } from '../utils/diary';

const { width } = Dimensions.get('window');

export interface Props {
  user: User;
  profile: Profile;
  teachDiary?: Diary;
}

interface DispatchProps {
  editTeachDiary: (objectID: string, diary: Diary) => void;
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
const TeachDiaryScreen: ScreenType = ({
  user,
  profile,
  navigation,
  teachDiary,
  editTeachDiary,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [isModalCorrection, setIsModalCorrection] = useState(false);
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      const newProfile = await getProfile(teachDiary.profile.uid);
      if (newProfile) {
        setTargetProfile(newProfile);
      }
      setIsProfileLoading(false);
    };
    f();
  }, [teachDiary]);

  const getNewCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      if (teachDiary.correction) {
        const newCorrection = await getCorrection(teachDiary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (teachDiary.correction2) {
        const newCorrection = await getCorrection(teachDiary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      if (teachDiary.correction3) {
        const newCorrection = await getCorrection(teachDiary.correction3.id);
        if (newCorrection) {
          setCorrection3(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, [teachDiary]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      // プロフィールを取得
      await Promise.all([getNewProfile(), getNewCorrection()]);
    };
    f();
  }, [getNewCorrection, getNewProfile, navigation.state.params]);

  const setRedux = useCallback(
    (userInfo, diaryInfo): void => {
      setUser(userInfo);
      if (!teachDiary || !teachDiary.objectID) return;
      editTeachDiary(teachDiary.objectID, diaryInfo);
    },
    [editTeachDiary, setUser, teachDiary]
  );

  const goToCorrecting = useCallback((): void => {
    if (!teachDiary) return;
    navigation.navigate('TeachCorrecting', {
      objectID: teachDiary.objectID,
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

  useEffect(() => {
    if (!teachDiary) return;
    navigation.setParams({
      title: teachDiary.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachDiary]);

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.navigate('UserProfile', { uid });
    },
    [navigation]
  );

  return (
    <DiaryCommon
      isLoading={isLoading}
      isModalCorrection={isModalCorrection}
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

TeachDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const title = navigation.getParam('title');

  return {
    ...DefaultNavigationOptions,
    title,
    headerTitleStyle: styles.headerTitleStyle,
  };
};

export default TeachDiaryScreen;
