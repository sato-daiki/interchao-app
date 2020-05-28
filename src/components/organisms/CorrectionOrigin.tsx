import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { OriginIOS, OriginAndroid } from '../molecules';
import { Selection } from '../../types/correctingScreen';
import { ProfileIconHorizontal } from '../atoms';
import CorrectionTimer from '../molecules/CorrectionTimer';
import { getAlgoliaDate } from '../../utils/diary';
import { Diary, Profile } from '../../types';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../../styles/Common';

interface Props {
  isEmpty: boolean;
  isProfileLoading: boolean;
  teachDiary: Diary;
  targetProfile?: Profile;
  onTimeUp: () => void;
  setSelection?: (selection: Selection) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

const CorrectionOrigin: React.FC<Props> = ({
  isEmpty,
  isProfileLoading,
  teachDiary,
  targetProfile,
  onTimeUp,
  setSelection,
}) => {
  const { createdAt, title, text } = teachDiary;

  const onSelectionChange = (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ): void => {
    if (setSelection) {
      setSelection(e.nativeEvent.selection);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          {targetProfile && !isProfileLoading ? (
            <ProfileIconHorizontal
              userName={targetProfile.userName}
              photoUrl={targetProfile.photoUrl}
              nativeLanguage={targetProfile.nativeLanguage}
            />
          ) : (
            <ActivityIndicator />
          )}
          <CorrectionTimer onTimeUp={onTimeUp} />
        </View>
        <Text style={styles.postDayText}>{getAlgoliaDate(createdAt)}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {Platform.OS === 'ios' ? (
        <OriginIOS
          isEmpty={isEmpty}
          text={text}
          onSelectionChange={onSelectionChange}
        />
      ) : (
        <OriginAndroid isEmpty={isEmpty} text={text} />
      )}
    </View>
  );
};

export default CorrectionOrigin;
