import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import firebase from '../configs/firebase';

import { User } from '../types/user';
import {
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
} from '../styles/Common';
import { TextButtun } from '../components/atoms';
import { ModalLackPoint } from '../components/organisms';

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

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: React.FC<Props & DispatchProps> = ({
  navigation,
  setUser,
}): JSX.Element => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isModalAlert, setIsModalAlert] = useState(false);

  const onPressPreview = useCallback(() => {
    const f = async (): Promise<void> => {
      const profile = {
        name: 'daiki',
        photoUrl:
          'https://flickrtheblog.files.wordpress.com/2019/05/panda402x.png',
        ref: '',
      };
      firebase
        .firestore()
        .collection('diaries')
        .add({
          profile,
          title,
          text,
          diaryStatus: 'publish',
          correctionStatus: 'yet',
          isReview: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };
    f();
  }, [text, title]);
  const onPressDraft = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <ModalLackPoint
        visible
        onPressClose={(): void => setIsModalAlert(false)}
      />
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={(txt): void => setTitle(txt)}
        placeholder="Title"
        maxLength={32}
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(txt): void => setText(txt)}
        placeholder="本文"
        maxLength={100}
        underlineColorAndroid="transparent"
        multiline
      />
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TextButtun title="プレビュー" onPress={onPressPreview} />
          <TextButtun title="下書き" onPress={onPressDraft} />
        </View>
      </View>
    </View>
  );
};

export default PostDiaryScreen;
