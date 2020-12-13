import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import {
  subTextColor,
  fontSizeS,
  fontSizeM,
  primaryColor,
} from '../../styles/Common';
import { ProfileIconHorizontal } from '../atoms';
import CorrectionTimer from './CorrectionTimer';
import { getAlgoliaDate } from '../../utils/time';
import { Diary, Profile } from '../../types';

interface Props {
  isProfileLoading: boolean;
  teachDiary: Diary;
  targetProfile?: Profile;
  onTimeUp: () => void;
}
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingBottom: 8,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
});

const CorrectingHeader: React.FC<Props> = ({
  isProfileLoading,
  teachDiary,
  targetProfile,
  onTimeUp,
}) => {
  const { createdAt, title } = teachDiary;

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        {targetProfile && !isProfileLoading ? (
          <ProfileIconHorizontal
            userName={targetProfile.userName}
            photoUrl={targetProfile.photoUrl}
            nativeLanguage={targetProfile.nativeLanguage}
            nationalityCode={targetProfile.nationalityCode}
          />
        ) : (
          <ActivityIndicator />
        )}
        <CorrectionTimer onTimeUp={onTimeUp} />
      </View>
      <Text style={styles.postDayText}>{getAlgoliaDate(createdAt)}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CorrectingHeader;
