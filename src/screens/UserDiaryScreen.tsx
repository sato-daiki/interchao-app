import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import Algolia from '../utils/Algolia';
import { Profile, Correction, Diary } from '../types';
import { UserDiaryStatus } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { ProfileIconHorizontal, Space, CopyText } from '../components/atoms';
import { getAlgoliaDate } from '../utils/diary';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import { getCorrection } from '../utils/corrections';
import I18n from '../utils/I18n';
import { getProfile } from '../utils/profile';
import Corrections from '../components/organisms/Corrections';
import UnderLineText from '../components/organisms/UnderLineText';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
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
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 16,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
    lineHeight: fontSizeM * 1.3,
  },
});

/**
 * 日記詳細
 */
const UserDiaryScreen: ScreenType = ({ navigation }) => {
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [isDiaryLoading, setIsDiaryLoading] = useState(true);
  const [teachDiary, setTeachDiary] = useState<Diary>();
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();
  const [hidden1, setHidden1] = useState(false);
  const [hidden2, setHidden2] = useState(false);
  const [hidden3, setHidden3] = useState(false);

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

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.push('UserProfile', { uid });
    },
    [navigation]
  );

  const onPressHidden = (prmCorrectedNum: number): void => {
    if (prmCorrectedNum === 1) setHidden1(!hidden1);
    if (prmCorrectedNum === 2) setHidden2(!hidden2);
    if (prmCorrectedNum === 3) setHidden3(!hidden3);
  };

  if (!isDiaryLoading && !teachDiary) {
    return (
      <View style={styles.errContainer}>
        <Text>{I18n.t('errorMessage.deleteTargetPage')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.main}>
          {targetProfile && !isProfileLoading ? (
            <ProfileIconHorizontal
              userName={targetProfile.userName}
              photoUrl={targetProfile.photoUrl}
              nativeLanguage={targetProfile.nativeLanguage}
              nationalityCode={targetProfile.nationalityCode}
              onPress={(): void => onPressUser(targetProfile.uid)}
            />
          ) : (
            <ActivityIndicator />
          )}
          <Space size={8} />
          {teachDiary && !isDiaryLoading ? (
            <>
              <View style={styles.header}>
                <Text style={styles.postDayText}>
                  {getAlgoliaDate(teachDiary.createdAt)}
                </Text>
                <UserDiaryStatus diary={teachDiary} />
              </View>
              <CopyText style={styles.title} text={teachDiary.title} />
              {isCorrectionLoading ? (
                <Text style={styles.text}>{teachDiary.text}</Text>
              ) : (
                <UnderLineText
                  text={teachDiary.text}
                  textStyle={styles.text}
                  correction={correction}
                  correction2={correction2}
                  correction3={correction3}
                  hidden1={hidden1}
                  hidden2={hidden2}
                  hidden3={hidden3}
                />
              )}
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        {!isCorrectionLoading ? (
          <Corrections
            headerTitle={I18n.t('teachDiaryCorrection.header')}
            correction={correction}
            correction2={correction2}
            correction3={correction3}
            hidden1={hidden1}
            hidden2={hidden2}
            hidden3={hidden3}
            onPressUser={(uid: string): void => {
              navigation.push('UserProfile', { uid });
            }}
            onPressHidden={onPressHidden}
          />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  );
};

UserDiaryScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('teachDiary.headerTitle'),
  };
};

export default UserDiaryScreen;
