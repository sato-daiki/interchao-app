import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Vibration,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
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
} from '../components/atoms';
import { getPostDay } from '../utils/diary';
import CorrectionText from '../components/organisms/CorrectionText';
import { User, Diary } from '../types';

const VIBRATION_DURATION = 500;
export const LINE_HEIGHT = fontSizeM * 1.7;
const LINE_SPACE = LINE_HEIGHT - fontSizeM;

interface Props {
  user: User;
  teachDiary: Diary;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

interface Position {
  index: number;
  startX: number;
  endX: number;
  line: number;
}

export interface Word {
  index: number;
  startX: number;
  endX: number;
  line: number;
}

interface Origin {
  y: number;
  line: number;
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
});

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({ navigation, teachDiary }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalComment, setIsModalComment] = useState(false);
  const [origin, setOrigin] = useState<Origin>();
  const [startWord, setStartWord] = useState<Word>();
  const [endWord, setEndWord] = useState<Word>();
  const [positions, setPositions] = useState<Position[]>([]);

  const { createdAt, title, profile, text } = teachDiary;
  const { userName, photoUrl } = profile;

  const onPressSubmit = useCallback(() => {}, []);
  useEffect(() => {
    navigation.setParams({ onPressSubmit });
  }, []);

  const onLongPress = useCallback(
    (index: number, event: LongPressGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        // const x = event.nativeEvent.absoluteX - event.nativeEvent.x;
        const y = event.nativeEvent.absoluteY - event.nativeEvent.y;
        const targetPosition = positions.find(
          element => element.index === index
        );
        if (!targetPosition) return;
        const indexInfo = {
          index,
          startX: targetPosition.startX,
          endX: targetPosition.endX,
          line: targetPosition.line,
        };
        setStartWord(indexInfo);
        setEndWord(indexInfo);
        setOrigin({
          y,
          line: targetPosition.line,
        });
        Vibration.vibrate(VIBRATION_DURATION);
        positions.sort((a, b) => {
          return a.index - b.index;
        });
      } else if (event.nativeEvent.state === State.END) {
        setIsModalComment(true);
      }
    },
    [positions, setStartWord]
  );

  const onLayout = (index: number, event: LayoutChangeEvent): void => {
    const { x, y, width } = event.nativeEvent.layout;
    setPositions([
      ...positions,
      {
        index,
        startX: x,
        endX: x + width - 4,
        line: Math.floor(y / LINE_HEIGHT) + 1,
      },
    ]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): Position | undefined => {
      if (!origin) return undefined;
      const moveY = origin.y - absoluteY;
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
      const resPosition = positions.find(
        p =>
          p.startX <= absoluteX &&
          p.endX >= absoluteX &&
          p.line === origin.line - moveLine
      );
      return resPosition;
    },
    [positions, origin]
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
    [findCellIndex]
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

  const onPressComment = (): void => {};

  const clear = (): void => {
    setStartWord(undefined);
    setEndWord(undefined);
    setOrigin(undefined);
  };

  return (
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
        text={text}
        isModalComment={isModalComment}
        startWord={startWord}
        endWord={endWord}
        onLongPress={onLongPress}
        onGestureEventTop={onGestureEventTop}
        onGestureEventEnd={onGestureEventEnd}
        onLayout={onLayout}
        onPressComment={onPressComment}
        clear={clear}
      />
    </View>
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

export default CorrectingScreen;
