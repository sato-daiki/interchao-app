import React, {
  useCallback,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import ViewShot from 'react-native-view-shot';
import { StackScreenProps } from '@react-navigation/stack';
import firebase from '../constants/firebase';
import { Diary, User, Profile } from '../types';
import { UserDiaryStatus } from '../components/molecules';
import { ModalAlertCorrection, ModalConfirm } from '../components/organisms';
import {
  LoadingModal,
  SubmitButton,
  ProfileIconHorizontal,
  Space,
  HeaderRight,
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
import Corrections from '../components/organisms/Corrections';
import RichText from '../components/organisms/RichText';
import { appShare } from '../utils/common';
import TeachDiaryMenu from '../components/web/organisms/TeachDiaryMenu';
import {
  TeachDiaryTabStackParamList,
  ModalCorrectingStackParamList,
} from '../navigations/MainTabNavigator';

export interface Props {
  user: User;
  profile: Profile;
  teachDiary?: Diary;
}

interface DispatchProps {
  editTeachDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
}

type ScreenType = StackScreenProps<
  TeachDiaryTabStackParamList & ModalCorrectingStackParamList,
  'TeachDiary'
> &
  Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  errContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    lineHeight: fontSizeM * 1.3,
  },
  correctionButton: {
    marginTop: 16,
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
    lineHeight: fontSizeM * 1.3,
    paddingBottom: 16,
  },
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
    paddingBottom: 12,
  },
});

/**
 * 日記詳細
 */
const TeachDiaryScreen: React.FC<ScreenType> = ({
  user,
  profile,
  navigation,
  teachDiary,
  editTeachDiary,
  setUser,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();
  const [isModalCorrection, setIsModalCorrection] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const viewShotRef = useRef<any>(null);

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const onPressAppShare = useCallback(() => {
    const f = async (): Promise<void> => {
      if (Platform.OS === 'ios') {
        const imageUrl = await viewShotRef.current.capture();
        appShare(profile.nativeLanguage, imageUrl);
      } else {
        appShare(profile.nativeLanguage);
      }
    };
    f();
  }, [profile.nativeLanguage]);

  const onPressMore = useCallback(() => {
    const options = [
      I18n.t(Platform.OS === 'ios' ? 'sns.diary' : 'sns.app'),
      I18n.t('common.cancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 1,
      },
      index => {
        switch (index) {
          case 0:
            onPressAppShare();
            break;
          default:
        }
      }
    );
  }, [onPressAppShare, showActionSheetWithOptions]);

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
  }, [getNewCorrection, getNewProfile]);

  const onPressSubmitCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary || !teachDiary.objectID) return;
      if (isLoading) return;
      setIsLoading(true);

      // 他の人が添削を開始していないかチェックする
      const index = await Algolia.getDiaryIndex();
      await Algolia.setSettings(index);
      const res = await index.search('', {
        filters: `objectID: ${teachDiary.objectID} AND (correctionStatus: correcting OR correctionStatus2: correcting OR correctionStatus3: correcting)`,
        page: 0,
        hitsPerPage: 1,
      });

      if (res.nbHits > 0) {
        setErrorMessage(I18n.t('errorMessage.correctionAlready'));
        setIsModalError(true);
        setIsModalCorrection(false);
        setIsLoading(false);
        return;
      }
      const res2 = await index.search('', {
        filters: `objectID: ${teachDiary.objectID} AND (correctionStatus: yet OR correctionStatus2: yet OR correctionStatus3: yet)`,
        page: 0,
        hitsPerPage: 1,
      });

      if (res2.nbHits !== 1) {
        setErrorMessage(I18n.t('errorMessage.correctionAlready'));
        setIsModalError(true);
        setIsModalCorrection(false);
        setIsLoading(false);
        return;
      }

      const diary = res2.hits[0] as Diary;
      const data = {
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as any;
      let correctingCorrectedNum: number;
      if (diary.correctionStatus === 'yet') {
        data.correctionStatus = 'correcting';
        correctingCorrectedNum = 1;
      } else if (diary.correctionStatus2 === 'yet') {
        data.correctionStatus2 = 'correcting';
        correctingCorrectedNum = 2;
      } else if (diary.correctionStatus3 === 'yet') {
        data.correctionStatus3 = 'correcting';
        correctingCorrectedNum = 3;
      } else {
        return;
      }
      const batch = firebase.firestore().batch();

      //  添削中のobjectIDを更新する
      const userRef = firebase.firestore().doc(`users/${user.uid}`);
      batch.update(userRef, {
        correctingObjectID: teachDiary.objectID,
        correctingCorrectedNum,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setUser({
        ...user,
        correctingObjectID: teachDiary.objectID,
        correctingCorrectedNum,
      });

      //  添削中一覧に追加する
      const correctingRef = firebase
        .firestore()
        .doc(`correctings/${teachDiary.objectID}`);
      batch.set(correctingRef, {
        uid: user.uid,
        correctedNum: correctingCorrectedNum,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      //  日記のステータスを添削中に変更する
      const diaryRef = firebase
        .firestore()
        .doc(`diaries/${teachDiary.objectID}`);

      batch.update(diaryRef, data);
      editTeachDiary(teachDiary.objectID, {
        ...teachDiary,
        ...data,
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
    navigation.setOptions({
      title: teachDiary.title,
      // headerRight: (): JSX.Element =>
      //   isDesktopOrLaptopDevice ? (
      //     <TeachDiaryMenu onPressAppShare={onPressAppShare} />
      //   ) : (
      //     <HeaderRight name="dots-horizontal" onPress={onPressMore} />
      //   ),
      // TODO: シェア機能ができてから
      headerRight: (): JSX.Element | null =>
        Platform.OS === 'web' ? null : (
          <HeaderRight name="dots-horizontal" onPress={onPressMore} />
        ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachDiary]);

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.navigate('UserProfile', { uid });
    },
    [navigation]
  );

  const isTeachLanguages = (): boolean => {
    // 教えることが可能な言語の場合true
    if (!targetProfile) return false;
    if (profile.nativeLanguage === targetProfile.learnLanguage) return true;
    if (profile.spokenLanguages) {
      for (let i = 0; i <= profile.spokenLanguages.length; i += 1) {
        if (profile.spokenLanguages[i] === targetProfile.learnLanguage) {
          return true;
        }
      }
    }
    return false;
  };

  const isAlready = (): boolean => {
    // すでに投稿したユーザの場合だめ
    if (!teachDiary || !teachDiary.correction) return false;
    if (teachDiary.correction.profile.uid === user.uid) return true;
    if (!teachDiary.correction2) return false;
    if (teachDiary.correction2.profile.uid === user.uid) return true;
    if (!teachDiary.correction3) return false;
    if (teachDiary.correction3.profile.uid === user.uid) return true;
    return false;
  };

  const isEnd = (): boolean => {
    // 3人の添削が終わっている場合
    if (!teachDiary) return false;
    if (teachDiary.correction3) {
      return true;
    }
    // 古いバージョンの時は1人しか添削できなかったので。
    // teachDiary.correction3のチェックだと漏れてしまう
    if (teachDiary.correction3 === undefined && teachDiary.correction) {
      return true;
    }
    return false;
  };

  const onPressCloseError = (): void => {
    setErrorMessage('');
    setIsModalError(false);
  };

  const renderButton = (): ReactNode => {
    // 添削中でなく、自分がすでに添削を終えたやつじゃなく3つめの添削が終わっていない場合
    if (
      isTeachLanguages() &&
      teachDiary &&
      teachDiary.correctionStatus !== 'correcting' &&
      teachDiary.correctionStatus2 !== 'correcting' &&
      teachDiary.correctionStatus3 !== 'correcting' &&
      !isAlready() &&
      !isEnd()
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
    return null;
  };

  if (!teachDiary) {
    return (
      <View style={styles.errContainer}>
        <Text>{I18n.t('errorMessage.deleteTargetPage')}</Text>
      </View>
    );
  }

  const postDate = getAlgoliaDate(teachDiary.createdAt);
  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalAlertCorrection
        visible={isModalCorrection}
        isLoading={isLoading}
        animationOut="flash"
        teachDiaryLanguage={teachDiary.profile.learnLanguage}
        onPressSubmit={onPressSubmitCorrection}
        onPressClose={(): void => setIsModalCorrection(false)}
      />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      <ScrollView style={styles.scrollView}>
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <Space size={12} />
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
            <View style={styles.header}>
              <Text style={styles.postDayText}>{postDate}</Text>
              <UserDiaryStatus diary={teachDiary} />
            </View>
            <RichText
              style={styles.title}
              text={teachDiary.title}
              nativeLanguage={profile.nativeLanguage}
              textLanguage={teachDiary.profile.learnLanguage}
            />
            <RichText
              style={styles.text}
              text={teachDiary.text}
              nativeLanguage={profile.nativeLanguage}
              textLanguage={teachDiary.profile.learnLanguage}
            />
            <Text style={styles.textLength}>
              {I18n.t('postDiaryComponent.textLength')}
              {` ${teachDiary.text.length}`}
            </Text>
          </View>
          <Corrections
            isLoading={isCorrectionLoading}
            headerTitle={I18n.t('teachDiaryCorrection.header')}
            correction={correction}
            correction2={correction2}
            correction3={correction3}
            onPressUser={(uid: string): void => {
              navigation.push('UserProfile', { uid });
            }}
            nativeLanguage={profile.nativeLanguage}
            textLanguage={teachDiary.profile.learnLanguage}
          />
        </ViewShot>
        {renderButton()}
        <Space size={16} />
      </ScrollView>
    </View>
  );
};

export default connectActionSheet(TeachDiaryScreen);
