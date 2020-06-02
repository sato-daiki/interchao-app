import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '../../styles/Common';
import { getAlgoliaDate } from '../../utils/diary';
import { Diary, Profile, Correction, User } from '../../types';
import { UserDiaryStatus } from '../molecules';
import ModalAlertCorrection from './ModalAlertCorrection';
import {
  LoadingModal,
  ProfileIconHorizontal,
  Space,
  CopyText,
  SubmitButton,
} from '../atoms';
import Corrections from './Corrections';
import I18n from '../../utils/I18n';

interface Props {
  isLoading: boolean;
  isModalCorrection: boolean;
  isDiaryLoading?: boolean;
  isProfileLoading: boolean;
  isCorrectionLoading: boolean;
  user: User;
  targetProfile?: Profile;
  teachDiary?: Diary;
  profile: Profile;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
  onPressClose: () => void;
  onPressUser: (uid: string) => void;
  onPressCorrection: () => void;
  onPressSubmitCorrection: () => void;
}

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
    paddingBottom: 32,
    lineHeight: fontSizeM * 1.3,
  },
});

const DiaryCommon = ({
  isLoading,
  isModalCorrection,
  isDiaryLoading = false,
  isProfileLoading,
  isCorrectionLoading,
  user,
  targetProfile,
  teachDiary,
  profile,
  correction,
  correction2,
  correction3,
  onPressClose,
  onPressUser,
  onPressCorrection,
  onPressSubmitCorrection,
}: Props): JSX.Element => {
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

  if (!isDiaryLoading && !teachDiary) {
    return (
      <View style={styles.errContainer}>
        <Text>{I18n.t('errorMessage.deleteTargetPage')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalAlertCorrection
        visible={isModalCorrection}
        isLoading={isLoading}
        animationOut="flash"
        onPressSubmit={onPressSubmitCorrection}
        onPressClose={onPressClose}
      />
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
              <CopyText style={styles.text} text={teachDiary.text} />
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
            onPressUser={(uid: string): void => onPressUser(uid)}
          />
        ) : null}
        {targetProfile &&
        profile.nativeLanguage === targetProfile.learnLanguage &&
        teachDiary &&
        teachDiary.correctionStatus !== 'correcting' &&
        teachDiary.correctionStatus2 !== 'correcting' &&
        teachDiary.correctionStatus3 !== 'correcting' &&
        !isAlready() &&
        !isEnd() ? (
          <View style={styles.correctionButton}>
            <SubmitButton
              isLoading={isLoading}
              title={I18n.t('teachDiary.start')}
              onPress={onPressCorrection}
            />
          </View>
        ) : null}

        <Space size={16} />
      </ScrollView>
    </View>
  );
};

export default DiaryCommon;
