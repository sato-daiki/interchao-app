import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  offWhite,
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

interface Props {
  user: User;
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
  textInput: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
    lineHeight: fontSizeM * 1.3,
  },
});

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({ navigation, teachDiary }) => {
  const originalText =
    'British Foreign Secretary Dominic Raab. AAA EEE CCC DDD';

  const { createdAt, title, profile } = teachDiary;
  const { userName, photoUrl } = profile;
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(originalText);
  const postDay = getPostDay(createdAt);

  const onPressClose = useCallback(() => {}, []);
  const onPressSubmit = useCallback(() => {}, []);

  useEffect(() => {
    navigation.setParams({ onPressClose });
    navigation.setParams({ onPressSubmit });
  }, []);

  const onLongPress = () => {};

  const onPressUser = () => {};

  const onChangeText = useCallback((txt: string) => {
    setText(txt);
  }, []);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <View style={styles.main}>
        <ProfileIconHorizontal
          userName={userName}
          photoUrl={photoUrl}
          onPress={onPressUser}
        />
        <Space size={8} />
        <View style={styles.header}>
          <Text style={styles.postDayText}>{postDay}</Text>
          <UserDiaryStatus diary={teachDiary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          multiline
          selectTextOnFocus
          onChangeText={onChangeText}
          // selection={{ start: 0, end: 1 }}
        />
      </View>
    </View>
  );
};

CorrectingScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressClose = navigation.getParam('onPressClose');
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: '添削する',
    headerLeft: (): JSX.Element => (
      <HeaderText title="閉じる" onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="完了" onPress={onPressSubmit} />
    ),
  };
};

export default CorrectingScreen;
