import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { fontSizeM, subTextColor, borderLightColor } from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Comment, Language } from '../../types';
import { getAlgoliaDate } from '../../utils/diary';
import { CorrectionItem, Summary } from '../molecules';
import { HideButton } from '../atoms';

interface Props {
  nativeLanguage: Language;
  textLanguage: Language;
  correction: Correction;
  onPressUser?: (uid: string) => void;
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

const keyExtractor = (item: Comment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const TeachDiaryCorrection: React.FC<Props> = ({
  nativeLanguage,
  textLanguage,
  correction,
  onPressUser,
}): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const [hidden, setHidden] = useState(false);

  const postDate = getAlgoliaDate(createdAt);
  const listFooterComponent = (): JSX.Element | null => {
    if (summary) {
      return (
        <Summary
          summary={summary}
          nativeLanguage={nativeLanguage}
          textLanguage={textLanguage}
        />
      );
    }
    return null;
  };

  const renderItem = useCallback(
    ({ item }: { item: Comment }): JSX.Element => {
      const { original, fix, detail, diffs } = item;
      return (
        <CorrectionItem
          original={original}
          fix={fix}
          detail={detail}
          diffs={diffs}
          nativeLanguage={nativeLanguage}
          textLanguage={textLanguage}
        />
      );
    },
    [nativeLanguage, textLanguage]
  );

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
              onPress={(): void => onPressUser && onPressUser(profile.uid)}
            />
            <Text style={styles.daytext}>{postDate}</Text>
          </View>
          <FlatList
            data={comments}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListFooterComponent={listFooterComponent}
            scrollEnabled={false}
          />
        </>
      )}
    </View>
  );
};

export default TeachDiaryCorrection;
