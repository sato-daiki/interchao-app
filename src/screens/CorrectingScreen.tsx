import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Vibration,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import firebase from '../constants/firebase';
import {
  fontSizeS,
  subTextColor,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import { UserDiaryStatus } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  HeaderText,
  LoadingModal,
  ProfileIconHorizontal,
  Space,
  CommentCard,
} from '../components/atoms';
import { User, Diary, Comment, Profile } from '../types';
import { getPostDay, getDisplayProfile } from '../utils/diary';
import CorrectionText from '../components/organisms/CorrectionText';
import CommentInputCard from '../components/organisms/CommentInputCard';
import { ActiveWord, InitialWord, LongPressWord } from '../types/correcting';

const VIBRATION_DURATION = 500;
const LINE_HEIGHT = fontSizeM * 1.7;
const LINE_SPACE = LINE_HEIGHT - fontSizeM;

interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
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
  correctMain: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});

const keyExtractor = (item: Comment, index: number): string => String(index);

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({
  navigation,
  teachDiary,
  currentProfile,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [longPressWord, setLongPressWord] = useState<LongPressWord>();
  const [startWord, setStartWord] = useState<ActiveWord>();
  const [endWord, setEndWord] = useState<ActiveWord>();
  const [initialWords, setInitialWords] = useState<InitialWord[]>([]);

  const [isModalComment, setIsModalComment] = useState(false); // コメントするのメニューのon/offフラグ

  /* コメント関連 */
  const [original, setOriginal] = useState(''); // 新規追加時の修正文
  const [isCommentInput, setIsCommentInput] = useState(false); // 新規追加のon/offフラグ

  const [comments, setComments] = useState<Comment[]>([]);
  const [summary, setSummary] = useState('');

  const { createdAt, title, profile, text } = teachDiary;
  const { userName, photoUrl } = profile;

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      setIsLoading(true);
      const displayProfile = getDisplayProfile(currentProfile);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const correction = {
        profile: displayProfile,
        comments,
        summary,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await firebase
        .firestore()
        .collection('diaries')
        .doc(teachDiary.objectID)
        .update({
          correction,
          correctionStatus: 'unread',
          updatedAt: timestamp,
        });
    };
    f();
  }, [currentProfile, comments, summary]);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
  }, [comments, summary]);

  const getPositionInfo = useCallback(
    (index: number): ActiveWord | undefined => {
      const targetPosition = initialWords.find(
        element => element.index === index
      );
      if (!targetPosition) return undefined;
      return {
        index,
        startX: targetPosition.startX,
        endX: targetPosition.endX,
        line: targetPosition.line,
      };
    },
    [initialWords]
  );

  const onLongPress = useCallback(
    (index: number, event: LongPressGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        const y = event.nativeEvent.absoluteY - event.nativeEvent.y;
        const indexInfo = getPositionInfo(index);
        if (!indexInfo) return undefined;

        setStartWord(indexInfo);
        setEndWord(indexInfo);
        setLongPressWord({
          y,
          line: indexInfo.line,
        });
        Vibration.vibrate(VIBRATION_DURATION);
      } else if (event.nativeEvent.state === State.END) {
        setIsModalComment(true);
      }
    },
    [getPositionInfo]
  );

  const onLayout = (
    index: number,
    word: string,
    event: LayoutChangeEvent
  ): void => {
    const { x, y, width } = event.nativeEvent.layout;
    setInitialWords([
      ...initialWords,
      {
        index,
        isComment: false,
        word,
        startX: x,
        endX: x + width - 4,
        line: Math.floor(y / LINE_HEIGHT) + 1,
      },
    ]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): InitialWord | undefined => {
      if (!longPressWord) return undefined;
      const moveY = longPressWord.y - absoluteY;
      let moveLine = 0;
      if (moveY > LINE_SPACE) {
        // 上に動いた時
        if (moveY < LINE_HEIGHT + LINE_SPACE) {
          moveLine = 1;
        } else {
          moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
        }
      } else if (moveY < -LINE_HEIGHT) {
        // 下に動いた時
        moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
      }
      const resPosition = initialWords.find(
        p =>
          p.startX <= absoluteX &&
          p.endX >= absoluteX &&
          p.line === longPressWord.line - moveLine
      );
      return resPosition;
    },
    [initialWords, longPressWord]
  );

  const onGestureEventTop = useCallback(
    (event: PanGestureHandlerGestureEvent): void => {
      const { absoluteX, absoluteY } = event.nativeEvent;
      const resPosition = findCellIndex(absoluteX, absoluteY);
      if (resPosition && endWord && resPosition.index <= endWord.index) {
        setStartWord({
          index: resPosition.index,
          startX: resPosition.startX,
          endX: resPosition.endX,
          line: resPosition.line,
        });
      }
    },
    [endWord, findCellIndex]
  );

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition && startWord && resPosition.index >= startWord.index) {
      // 後ろのピンが前のピンより手前にはいけないようにする
      setEndWord({
        index: resPosition.index,
        startX: resPosition.startX,
        endX: resPosition.endX,
        line: resPosition.line,
      });
    }
  };

  const clear = (): void => {
    setStartWord(undefined);
    setEndWord(undefined);
    setLongPressWord(undefined);
  };

  const getInitialWord = (i: number): InitialWord[] => {
    return initialWords.map(item => {
      if (item.index !== i) {
        return item;
      }
      return {
        ...item,
        isComment: true,
      };
    });
  };

  const onPressComment = useCallback((): void => {
    initialWords.sort((a, b) => {
      return a.index - b.index;
    });
    if (!startWord || !endWord) return;
    let newOriginal = '';
    for (let i = startWord.index; i <= endWord.index; i += 1) {
      newOriginal += `${initialWords[i].word} `;
    }

    // const newInitialWords = initialWords.map(item => {
    //   if (item.index >= startWord.index && item.index <= endWord.index) {
    //     return {
    //       ...item,
    //       isComment: true,
    //     };
    //   }
    //   return item;
    // });
    // setInitialWords(newInitialWords);

    // 新規コメントを初期化して表示する
    setIsCommentInput(true);
    setOriginal(newOriginal);

    // コメントするのメニューを非表示にする
    setIsModalComment(false);
  }, [initialWords, startWord, endWord, comments]);

  const onPressCard = useCallback(
    (startWordIndex: number, endWordIndex: number): void => {
      const startWardInfo = getPositionInfo(startWordIndex);
      const endWordInfo = getPositionInfo(endWordIndex);
      setStartWord(startWardInfo);
      setEndWord(endWordInfo);
      console.log('onPressCard', startWardInfo, endWordInfo);
    },
    [getPositionInfo]
  );

  /**
   * コメント編集画面で完了ボタン押下時
   */
  const onPressSubmitEditComment = useCallback(
    (id: string, fix: string, detail: string): void => {
      const newComments = comments.map(item => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          fix,
          detail,
        };
      }, []);

      setComments(newComments);
    },
    [comments]
  );

  /**
   * コメントのメニューアイコンをクリック後、編集するボタンをクリック
   */
  const onPressCommentEdit = useCallback(
    (item: Comment) => {
      navigation.navigate('EditCorrectionComment', {
        item,
        onPressSubmit: onPressSubmitEditComment,
      });
    },
    [navigation]
  );

  /**
   * コメントのメニューアイコンをクリック後、削除するボタンをクリック
   */
  const onPressCommentDelete = useCallback(
    (id: string) => {
      const newComments = comments.filter(item => item.id !== id);
      setComments(newComments);
    },
    [comments]
  );

  /**
   * コメントのメニューアイコンをクリック
   */
  const onPressMore = useCallback(
    (item: Comment) => {
      const options = ['編集する', 'コメントを削除する', 'キャンセル'];
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        index => {
          switch (index) {
            case 0:
              onPressCommentEdit(item);
              break;
            case 1:
              onPressCommentDelete(item.id);
              break;
            default:
          }
        }
      );
    },
    [onPressCommentEdit, onPressCommentDelete, showActionSheetWithOptions]
  );

  /**
   * 新規追加のコメントを追加する
   */
  const onPressSubmitComment = useCallback(
    (fix: string, detail: string): void => {
      if (!startWord || !endWord) return;
      const newComments = [
        ...comments,
        {
          id: `${startWord.index.toString()}-${endWord.index.toString()}`,
          startWordIndex: startWord.index,
          endWordIndex: endWord.index,
          original,
          fix,
          detail,
        },
      ];
      newComments.sort((a, b) => {
        return a.startWordIndex - b.startWordIndex;
      });
      setComments(newComments);

      setStartWord(undefined);
      setEndWord(undefined);
      setOriginal('');
      setIsCommentInput(false);
    },
    [comments, original, startWord, endWord]
  );

  /**
   * 新規追加のコメントを閉じる
   */
  const onPressCloseComment = useCallback((): void => {
    setStartWord(undefined);
    setEndWord(undefined);
    setOriginal('');
    setIsCommentInput(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Comment; index: number }): JSX.Element => {
      return (
        <CommentCard
          index={index}
          original={item.original}
          fix={item.fix}
          detail={item.detail}
          isEdit
          onPressMore={(): void => onPressMore(item)}
        />
      );
    },
    [onPressMore]
  );

  return (
    // <TouchableWithoutFeedback onPress={clear}>
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <View style={styles.main}>
        <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
        <Space size={8} />
        <View style={styles.header}>
          <Text style={styles.postDayText}>{getPostDay(createdAt)}</Text>
          <UserDiaryStatus diary={teachDiary} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <CorrectionText
        text="Wow guys that really solved a problem i had.. useeffect doesn't imitate componentDidUpdate even after using prop as the last parameter , i used Hammeds solution with useDidUpdate and i just added a prevprops var . seems to be working fine so far."
        isModalComment={isModalComment}
        startWord={startWord}
        endWord={endWord}
        onLongPress={onLongPress}
        onGestureEventTop={onGestureEventTop}
        onGestureEventEnd={onGestureEventEnd}
        onLayout={onLayout}
        onPressComment={onPressComment}
      />
      <View style={styles.correctMain}>
        {/* 新規でコメント追加 */}
        {isCommentInput ? (
          <CommentInputCard
            original={original}
            onPressSubmit={onPressSubmitComment}
            onPressClose={onPressCloseComment}
          />
        ) : null}
        {/* 追加後のコメント一覧 */}
        <FlatList
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};

CorrectingScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: '添削する',
    headerLeft: (): JSX.Element => (
      <HeaderText
        title="閉じる"
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="完了" onPress={onPressSubmit} />
    ),
  };
};

export default connectActionSheet(CorrectingScreen);
