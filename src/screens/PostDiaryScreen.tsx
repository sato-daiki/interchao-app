import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { User } from '../types/user';
import {
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
} from '../styles/Common';
import { TextButtun, HeaderText, LoadingModal } from '../components/atoms';
import { ModalAlertPublish } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { DiaryStatus, Profile, DisplayProfile, Diary } from '../types';
import { track, events } from '../utils/Analytics';

interface Props {
  user: User;
  profile: Profile;
  diaryTotalNum: number;
  draftDiaryTotalNum: number;
  setPoints: (points: number) => void;
  addDiary: (diary: Diary) => void;
  addDraftDiary: (diary: Diary) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
  setDraftDiaryTotalNum: (diaryTotalNum: number) => void;
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
  },
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    padding: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  textInput: {
    padding: 16,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.7,
    textAlignVertical: 'top',
    flex: 1,
    backgroundColor: '#fff',
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 124,
    width: '100%',
    backgroundColor: offWhite,
    justifyContent: 'flex-end',
  },
  footerButton: {
    paddingBottom: 32,
  },
});

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: ScreenType = ({
  navigation,
  user,
  profile,
  diaryTotalNum,
  draftDiaryTotalNum,
  setPoints,
  addDiary,
  addDraftDiary,
  setDiaryTotalNum,
  setDraftDiaryTotalNum,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressPublic: () => setIsModalAlert(true) });
  }, []);

  const getDiary = (diaryStatus: DiaryStatus): Diary => {
    const displayProfile: DisplayProfile = {
      uid: profile.uid,
      name: profile.name,
      userName: profile.userName,
      photoUrl: profile.photoUrl,
      ref: firebase.firestore().doc(`profiles/${profile.uid}`),
    };

    return {
      premium: user.premium || false,
      isPublic,
      title,
      text,
      profile: displayProfile,
      diaryStatus,
      correctionStatus: 'yet',
      correctionStatusPro: 'yet',
      isReview: false,
      isReviewPro: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
  };

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (loading) return;
      try {
        setLoading(true);
        const diary = getDiary('publish');
        const points = user.points - 10;
        const diaryDoc = await firebase
          .firestore()
          .collection('diaries')
          .add(diary);

        const refUser = firebase.firestore().doc(`users/${user.uid}`);
        await refUser.update({
          points,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        track(events.CREATED_DIARY, { diaryStatus: 'publish' });

        // reduxに追加
        addDiary({
          objectID: diaryDoc.id,
          ...diary,
        });
        setDiaryTotalNum(diaryTotalNum + 1);
        setPoints(points);

        navigation.navigate('MyDiaryList');
        setLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setLoading(false);
        Alert.alert('ネットワークエラーです');
      }
    };
    f();
  }, [getDiary]);

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      if (loading) return;
      try {
        setLoading(true);
        const diary = getDiary('draft');
        const diaryDoc = await firebase
          .firestore()
          .collection('diaries')
          .add(diary);

        track(events.CREATED_DIARY, { diaryStatus: 'draft' });

        // reduxに追加
        addDiary({
          objectID: diaryDoc.id,
          ...diary,
        });
        setDraftDiaryTotalNum(draftDiaryTotalNum + 1);

        navigation.navigate('DraftDiaryList');
        setLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setLoading(false);
        Alert.alert('ネットワークエラーです');
      }
    };
    f();
  }, [getDiary]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <ModalAlertPublish
        visible={isModalAlert}
        isPublic={isPublic}
        onValueChangePublic={(): void => setIsPublic(!isPublic)}
        onPressSubmit={onPressSubmit}
        onPressClose={(): void => setIsModalAlert(false)}
      />
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={(txt): void => setTitle(txt)}
        placeholder="Title"
        maxLength={100}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(txt): void => setText(txt)}
        placeholder="本文"
        underlineColorAndroid="transparent"
        multiline
        autoCapitalize="none"
        keyboardType="default"
      />
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TextButtun isBorrderTop title="下書き" onPress={onPressDraft} />
        </View>
      </View>
    </View>
  );
};

PostDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressPublic = navigation.getParam('onPressPublic');
  return {
    ...DefaultNavigationOptions,
    title: '新規日記',
    headerLeft: (): JSX.Element => (
      <HeaderText
        title="閉じる"
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="投稿" onPress={onPressPublic} />
    ),
  };
};

export default PostDiaryScreen;
