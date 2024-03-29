import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import Corrections from '@/components/organisms/Corrections';
import { DiaryTitleAndText, UserDiaryStatus } from '@/components/molecules';
import { ProfileIconHorizontal, Space } from '@/components/atoms';

import Algolia from '@/utils/Algolia';
import { Profile, Correction, Diary } from '@/types';
import { getAlgoliaDate } from '@/utils/time';
import { subTextColor, fontSizeS, fontSizeM } from '@/styles/Common';
import { getCorrection } from '@/utils/corrections';
import I18n from '@/utils/I18n';
import { getProfile } from '@/utils/profile';
import {
  CommonStackParamList,
  CommonNavigationProp,
} from '@/navigations/CommonNavigator';

export interface Props {
  profile: Profile;
}

type UserDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CommonStackParamList, 'UserDiary'>,
  CommonNavigationProp
>;

type UserDiaryRouteProp = RouteProp<CommonStackParamList, 'UserDiary'>;

type ScreenType = {
  navigation: UserDiaryNavigationProp;
  route: UserDiaryRouteProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 32,
  },
  errContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    lineHeight: fontSizeM * 1.3,
  },
  main: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
});

/**
 * 日記詳細
 */
const UserDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  profile,
}) => {
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [isDiaryLoading, setIsDiaryLoading] = useState(true);
  const [teachDiary, setTeachDiary] = useState<Diary>();
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();

  const getNewProfile = useCallback(async (diary: Diary): Promise<void> => {
    if (!diary) return;
    const newProfile = await getProfile(diary.profile.uid);
    if (newProfile) {
      setTargetProfile(newProfile);
    }
    setIsProfileLoading(false);
  }, []);

  const getNewCorrection = useCallback(async (diary: Diary): Promise<void> => {
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
  }, []);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const { objectID } = route.params;

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
  }, [getNewCorrection, getNewProfile, route.params]);

  const onPressUserProfile = useCallback((): void => {
    if (!targetProfile) return;
    navigation.push('UserProfile', { userName: targetProfile.userName });
  }, [navigation, targetProfile]);

  const onPressUserProfileCorrections = useCallback(
    (uid: string, userName: string): void => {
      navigation.push('UserProfile', { userName });
    },
    [navigation]
  );

  if (!isDiaryLoading && !teachDiary) {
    return (
      <View style={styles.errContainer}>
        <Text>{I18n.t('errorMessage.deleteTargetPage')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.main}>
          {targetProfile && !isProfileLoading ? (
            <ProfileIconHorizontal
              userName={targetProfile.userName}
              photoUrl={targetProfile.photoUrl}
              nativeLanguage={targetProfile.nativeLanguage}
              nationalityCode={targetProfile.nationalityCode}
              onPress={onPressUserProfile}
            />
          ) : (
            <ActivityIndicator />
          )}
          <Space size={8} />
          {teachDiary && !isDiaryLoading && targetProfile ? (
            <>
              <View style={styles.header}>
                <Text style={styles.postDayText}>
                  {getAlgoliaDate(teachDiary.createdAt)}
                </Text>
                <UserDiaryStatus diary={teachDiary} />
              </View>
              <DiaryTitleAndText
                themeCategory={teachDiary.themeCategory}
                themeSubcategory={teachDiary.themeSubcategory}
                nativeLanguage={profile.nativeLanguage}
                textLanguage={profile.learnLanguage}
                title={teachDiary.title}
                text={teachDiary.text}
              />
              <Space size={16} />
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        {targetProfile ? (
          <Corrections
            isLoading={isCorrectionLoading}
            headerTitle={I18n.t('teachDiaryCorrection.header')}
            correction={correction}
            correction2={correction2}
            correction3={correction3}
            nativeLanguage={profile.nativeLanguage}
            textLanguage={targetProfile.learnLanguage}
            onPressUser={onPressUserProfileCorrections}
          />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  );
};

export default UserDiaryScreen;
