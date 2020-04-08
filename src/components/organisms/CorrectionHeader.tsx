import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { UserDiaryStatus } from '../molecules';
import { InfoComment, Selection } from '../../types/correctingScreen';
import { ProfileIconHorizontal, Space, GrayHeader } from '../atoms';
import CorrectionTimer from './CorrectionTimer';
import CommentInputCard from './CommentInputCard';
import SummaryInputCard from './SummaryInputCard';
import { getAlgoliaDate } from '../../utils/diary';
import { Diary } from '../../types';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
  softRed,
} from '../../styles/Common';

interface Props {
  isCommentInput: boolean;
  isSummary: boolean;
  original: string;
  teachDiary: Diary;
  infoComments: InfoComment[];
  onTimeUp: () => void;
  onPressSubmitComment: (fix: string, detail: string) => void;
  onPressCloseComment: () => void;
  onPressSubmitSummary: (summaryText: string) => void;
  onPressCloseSummary: () => void;
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
  diaryHeader: {
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
  commentCard: {
    paddingHorizontal: 16,
  },
  textInput: {
    paddingHorizontal: 16,
    lineHeight: fontSizeM * 1.3,
  },
});

const CorrectionHeader: React.FC<Props> = ({
  isCommentInput,
  isSummary,
  original,
  teachDiary,
  infoComments,
  onTimeUp,
  onPressSubmitComment,
  onPressCloseComment,
  onPressSubmitSummary,
  onPressCloseSummary,
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
        <View style={styles.diaryHeader}>
          <Text style={styles.postDayText}>{getAlgoliaDate(createdAt)}</Text>
          <UserDiaryStatus diary={teachDiary} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        multiline
        editable={false}
        value={text}
        selectTextOnFocus
        onSelectionChange={e => {
          console.log('onSelectionChange', e.nativeEvent.selection);
          setSelection(e.nativeEvent.selection);
        }}
        contextMenuHidden
      />
      <Space size={32} />
      {/* 新規でコメント追加 */}
      {isCommentInput ? (
        <View style={styles.commentCard}>
          <CommentInputCard
            original={original}
            onPressSubmit={onPressSubmitComment}
            onPressClose={onPressCloseComment}
          />
        </View>
      ) : null}
      {/* 総評の追加 */}
      {isSummary ? (
        <View style={styles.commentCard}>
          <SummaryInputCard
            onPressSubmit={onPressSubmitSummary}
            onPressClose={onPressCloseSummary}
          />
        </View>
      ) : null}
      {infoComments.length > 0 ? (
        <>
          <GrayHeader title="コメント一覧" />
          <Space size={16} />
        </>
      ) : null}
    </View>
  );
};

export default CorrectionHeader;
