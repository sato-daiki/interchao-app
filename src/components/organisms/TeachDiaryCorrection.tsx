import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { CommentCard, SummaryCard, HideButton } from '../atoms';
import { fontSizeM, subTextColor, borderLightColor } from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Comment } from '../../types';
import { getAlgoliaDate } from '../../utils/diary';

interface Props {
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
  correction,
  onPressUser,
}): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const { uid, userName, photoUrl, nativeLanguage, nationalityCode } = profile;
  const [hidden, setHidden] = useState(false);

  const postDate = getAlgoliaDate(createdAt);
  const listFooterComponent = <SummaryCard summary={summary} />;

  const renderItem = useCallback(
    ({ item, index }: { item: Comment; index: number }): JSX.Element => {
      const { original, fix, detail } = item;
      return (
        <CommentCard
          index={index}
          original={original}
          fix={fix}
          detail={detail}
        />
      );
    },
    []
  );

  return (
    <View style={styles.main}>
      <HideButton hidden={hidden} onPress={(): void => setHidden(!hidden)} />
      {hidden ? null : (
        <>
          <View style={styles.header}>
            <ProfileIconHorizontal
              userName={userName}
              photoUrl={photoUrl}
              nativeLanguage={nativeLanguage}
              nationalityCode={nationalityCode}
              onPress={(): void => onPressUser && onPressUser(uid)}
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
