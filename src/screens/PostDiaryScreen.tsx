import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../configs/firebase';
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

interface Props {
  user: User;
  profile: Profile;
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
const PostDiaryScreen: ScreenType = ({ navigation, user, profile }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressPublic: () => setIsModalAlert(true) });
  }, []);

  const post = async (diaryStatus: DiaryStatus): Promise<void> => {
    if (loading) return;
    setLoading(true);
    const profile: DisplayProfile = {
      uid: profile.uid,
      name: profile.name,
      userName: profile.userName,
      photoUrl: profile.photoUrl,
      ref: firebase.firestore().doc(`profiles/${profile.uid}`),
    };

    const diary: Diary = {
      premium: user.premium || false,
      isPublic,
      title,
      text,
      profile,
      diaryStatus,
      correctionStatus: 'yet',
      correctionStatusPro: 'yet',
      isReview: false,
      isReviewPro: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const refDiary = firebase
      .firestore()
      .collection('diaries')
      .doc();
    const refUser = firebase.firestore().doc(`users/${user.uid}`);

    // トランザクション開始
    try {
      await firebase.firestore().runTransaction(async transaction => {
        transaction.set(refDiary, { ...diary });
        transaction.update(refUser, {
          points: user.points - 10,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

      setLoading(false);
      setIsModalAlert(false);
      if (diaryStatus === 'publish') {
        navigation.navigate('MyDiaryList');
      } else if (diaryStatus === 'draft') {
        navigation.navigate('DraftDiaryList', {
          reload: true,
        });
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('ネットワークエラーです');
    }
  };

  const onPressSubmit = useCallback(() => {
    post('publish');
  }, [post]);

  const onPressDraft = useCallback(() => {
    post('draft');
  }, [post]);

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
        maxLength={32}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(txt): void => setText(txt)}
        placeholder="本文"
        maxLength={100}
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
