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
import { DiaryStatus, Profile } from '../types';

interface Props {
  currentUser: User;
  currentProfile: Profile;
}

type PostDiaryScreenType = React.ComponentType<
  Props & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

export interface DispatchProps {
  setUser: (user: User) => void;
}

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
const PostDiaryScreen: PostDiaryScreenType = ({
  navigation,
  currentUser,
  currentProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const post = async (diaryStatus: DiaryStatus): Promise<void> => {
    if (loading) return;
    setLoading(true);
    const profile = {
      name: currentProfile.name,
      photoUrl: currentProfile.photoUrl,
      ref: firebase.firestore().doc(`profiles/${currentProfile.uid}`),
    };

    const diary = {
      profile,
      title,
      text,
      isPublic,
      diaryStatus,
      correctionStatus: 'yet',
      isReview: false,
      premium: currentUser.premium || false,
      correctionStatusPro: 'yet',
      isReviewPro: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const refDiary = firebase
      .firestore()
      .collection('diaries')
      .doc();
    const refUser = firebase.firestore().doc(`users/${currentUser.uid}`);

    // トランザクション開始
    try {
      await firebase.firestore().runTransaction(async transaction => {
        transaction.set(refDiary, { ...diary });
        transaction.update(refUser, {
          points: currentUser.points - 10,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

      setLoading(false);
      setIsModalAlert(false);
      if (diaryStatus === 'publish') {
        navigation.navigate('MyDiaryList');
      } else if (diaryStatus === 'draft') {
        navigation.navigate('DraftDiaryList');
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

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressPublic: () => setIsModalAlert(true) });
  }, []);

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
