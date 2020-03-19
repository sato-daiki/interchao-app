import React, { useCallback, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
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
});

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({ navigation, teachDiary }) => {
  const { createdAt, title, profile, text } = teachDiary;
  const { userName, photoUrl } = profile;
  const [isLoading, setIsLoading] = useState(false);
  const postDay = getPostDay(createdAt);

  const onPressSubmit = useCallback(() => {}, []);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
  }, []);

  const onPressUser = () => {};

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
      </View>
      <CorrectionText text="A Japanese man was sentenced on Thursday to 16 years in prison for physical abuse that led to the death of his 10-year-old daughter. Yuichiro Kurihara, 42, was found guilty of causing the death of his daughter Mia in January last year by depriving her of sleep and nutrition at their family home in Noda, Chiba Prefecture, with the court defining the abuse as inconceivably insidious and appalling." />
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
