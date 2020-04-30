import React, { useCallback, useState, useEffect, ReactNode } from 'react';
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
import { Profile } from '../types';
import TeachDiaryCorrection from '../components/organisms/TeachDiaryCorrection';
import { UserDiaryStatus } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { ProfileIconHorizontal, Space, HeaderText } from '../components/atoms';
import { getAlgoliaDate } from '../utils/diary';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import { getCorrection } from '../utils/corrections';
import { Correction } from '../types/correction';
import I18n from '../utils/I18n';
import { getProfile } from '../utils/profile';

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
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const { params = {} } = navigation.state;
  const { teachDiary } = params;

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

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.navigate('UserProfile', { uid });
    },
    [navigation]
  );

  const renderDiaryCorrection = (): ReactNode => {
    if (correction) {
      return <TeachDiaryCorrection correction={correction} />;
    }
    return null;
  };

  if (!teachDiary) {
    return (
      <View style={styles.errContainer}>
        <Text>{I18n.t('teachDiary.deleteTargetPage')}</Text>
      </View>
    );
  }

  const { createdAt, title, text } = teachDiary;
  const postDate = getAlgoliaDate(createdAt);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.main}>
          {targetProfile && !isProfileLoading ? (
            <ProfileIconHorizontal
              userName={targetProfile.userName}
              photoUrl={targetProfile.photoUrl}
              nativeLanguage={targetProfile.nativeLanguage}
              onPress={(): void => onPressUser(targetProfile.uid)}
            />
          ) : (
            <ActivityIndicator />
          )}
          <Space size={8} />
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDate}</Text>
            <UserDiaryStatus diary={teachDiary} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        {renderDiaryCorrection()}
      </ScrollView>
    </View>
  );
};

UserDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const title = navigation.getParam('title');
  const isYet = navigation.getParam('isYet');
  const onPressCorrection = navigation.getParam('onPressCorrection');

  return {
    ...DefaultNavigationOptions,
    title,
    headerRight: (): JSX.Element | null =>
      isYet ? (
        <HeaderText
          title={I18n.t('teachDiary.correcting')}
          onPress={onPressCorrection}
        />
      ) : null,
  };
};

export default UserDiaryScreen;
