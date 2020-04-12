import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { EmptyList } from '../molecules';
import { Selection } from '../../types/correctingScreen';
import { ProfileIconHorizontal, Space } from '../atoms';
import CorrectionTimer from '../molecules/CorrectionTimer';
import { getAlgoliaDate } from '../../utils/diary';
import { Diary } from '../../types';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../../styles/Common';

interface Props {
  isEmpty: boolean;
  teachDiary: Diary;
  onTimeUp: () => void;
  setSelection: (selection: Selection) => void;
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
  },
  textInput: {
    paddingHorizontal: 16,
    lineHeight: fontSizeM * 1.3,
    flex: 1,
  },
});

const CorrectionOrigin: React.FC<Props> = ({
  isEmpty,
  teachDiary,
  onTimeUp,
  setSelection,
}) => {
  const { createdAt, title, text, profile } = teachDiary;
  const { userName, photoUrl } = profile;
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
          <CorrectionTimer onTimeUp={onTimeUp} />
        </View>
        <Text style={styles.postDayText}>{getAlgoliaDate(createdAt)}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        multiline
        editable={false}
        value={text}
        selectTextOnFocus
        onSelectionChange={(
          e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
        ): void => {
          setSelection(e.nativeEvent.selection);
        }}
        contextMenuHidden
        scrollEnabled={false}
      />
      {isEmpty ? (
        <>
          <EmptyList
            iconName="cursor-pointer"
            message="文章をタップして添削を始めましょう"
            paddingTop={0}
          />
          <Space size={32} />
        </>
      ) : null}
    </View>
  );
};

export default CorrectionOrigin;
