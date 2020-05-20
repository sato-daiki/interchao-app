import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { Diary, User, Profile } from '../types';
import TeachDiaryCorrection from '../components/organisms/TeachDiaryCorrection';
import { UserDiaryStatus } from '../components/molecules';
import { ModalAlertCorrection } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  LoadingModal,
  SubmitButton,
  ProfileIconHorizontal,
  Space,
} from '../components/atoms';
import { getAlgoliaDate } from '../utils/diary';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import { getCorrection } from '../utils/corrections';
import { Correction } from '../types/correction';
import Algolia from '../utils/Algolia';
import I18n from '../utils/I18n';
import { getProfile } from '../utils/profile';
import { track, events } from '../utils/Analytics';

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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  headerTitleStyle: {
    width: width - 144,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  errContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctionButton: {
    padding: 16,
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
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [isModalCorrection, setIsModalCorrection] = useState(false);

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

  const onPressSubmitCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary || !teachDiary.objectID) return;
      if (isLoading) return;
      setIsLoading(true);

      // 他の人が添削を開始していないかチェックする
      const index = await Algolia.getDiaryIndex(true);
      await Algolia.setSettings(index);
      const res = await index.search('', {
        filters: `objectID: ${teachDiary.objectID} AND correctionStatus: yet`,
        page: 0,
        hitsPerPage: 1,
      });

      if (res.nbHits !== 1) {
        Alert.alert(
          I18n.t('common.error'),
          I18n.t('errorMessage.correctionAlready')
        );
        setIsLoading(false);
        return;
      }
      const batch = firebase.firestore().batch();

      //  添削中のobjectIDを更新する
      const userRef = firebase.firestore().doc(`users/${user.uid}`);
      batch.update(userRef, {
        correctingObjectID: teachDiary.objectID,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setUser({
        ...user,
        correctingObjectID: teachDiary.objectID,
      });

      //  添削中一覧に追加する
      const correctingRef = firebase
        .firestore()
        .doc(`correctings/${teachDiary.objectID}`);
      batch.set(correctingRef, {
        uid: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      //  日記のステータスを添削中に変更する
      const diaryRef = firebase
        .firestore()
        .doc(`diaries/${teachDiary.objectID}`);
      batch.update(diaryRef, {
        correctionStatus: 'correcting',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      editTeachDiary(teachDiary.objectID, {
        ...teachDiary,
        correctionStatus: 'correcting',
      });
      batch.commit();
      track(events.CREATED_CORRECTING);
      setIsModalCorrection(false);
      navigation.navigate('Correcting', { objectID: teachDiary.objectID });
      setIsLoading(false);
    };
    f();
  }, [editTeachDiary, isLoading, navigation, setUser, teachDiary, user]);

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

  const renderDiaryCorrection = (): ReactNode => {
    if (
      teachDiary &&
      teachDiary.correctionStatus === 'yet' &&
      targetProfile &&
      profile.nativeLanguage === targetProfile.learnLanguage
    ) {
      return (
        <View style={styles.correctionButton}>
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('teachDiary.start')}
            onPress={onPressCorrection}
          />
        </View>
      );
    }
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
      <LoadingModal visible={isLoading} />
      <ModalAlertCorrection
        visible={isModalCorrection}
        isLoading={isLoading}
        animationOut="flash"
        onPressSubmit={onPressSubmitCorrection}
        onPressClose={(): void => setIsModalCorrection(false)}
      />
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
