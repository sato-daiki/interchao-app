import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontSizeM, subTextColor, borderLightColor } from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Language } from '../../types';
import { getAlgoliaDate } from '../../utils/diary';
import { CorrectionItem, Summary } from '../molecules';
import { HideButton } from '../atoms';

interface Props {
  nativeLanguage: Language;
  textLanguage: Language;
  correction: Correction;
  onPressUser?: (uid: string, userName: string) => void;
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  daytext: {
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

// const keyExtractor = (item: Comment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const UserDiaryCorrection: React.FC<Props> = ({
  nativeLanguage,
  textLanguage,
  correction,
  onPressUser,
}): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const [hidden, setHidden] = useState(false);

  const postDate = getAlgoliaDate(createdAt);

  return (
    <View style={styles.main}>
      <HideButton hidden={hidden} onPress={(): void => setHidden(!hidden)} />
      {hidden ? null : (
        <>
          <View style={styles.header}>
            <ProfileIconHorizontal
              userName={profile.userName}
              photoUrl={profile.photoUrl}
              nativeLanguage={profile.nativeLanguage}
              nationalityCode={profile.nationalityCode}
              onPress={(): void => {
                if (onPressUser) {
                  onPressUser(profile.uid, profile.userName);
                }
              }}
            />
            <Text style={styles.daytext}>{postDate}</Text>
          </View>
          {comments.map(item => {
            const { original, fix, detail, diffs, rowNumber } = item;
            return (
              <CorrectionItem
                key={rowNumber}
                original={original}
                fix={fix}
                detail={detail}
                diffs={diffs}
                nativeLanguage={nativeLanguage}
                textLanguage={textLanguage}
              />
            );
          })}
          {summary ? (
            <Summary
              summary={summary}
              nativeLanguage={nativeLanguage}
              textLanguage={textLanguage}
            />
          ) : null}
        </>
      )}
    </View>
  );
};

export default UserDiaryCorrection;
