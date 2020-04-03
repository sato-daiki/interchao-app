import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { LoadingModal, TextButtun } from '../atoms';
import { ModalAlertPublish } from '.';
import ModalDiaryCancel from './ModalDiaryCancel';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';

const { height } = Dimensions.get('window');
const defaultHeight = height - 520;
const maxHeight = height - 200;

interface Props {
  isLoading: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  isPublic: boolean;
  title: string;
  text: string;
  onValueChangePublic: () => void;
  onPressCloseModalPublish: () => void;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressSubmit: () => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
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
    height: defaultHeight,
    flex: 1,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const PostDiary = ({
  isLoading,
  isModalAlert,
  isModalCancel,
  isPublic,
  title,
  text,
  onValueChangePublic,
  onPressCloseModalPublish,
  onPressCloseModalCancel,
  onChangeTextTitle,
  onChangeTextText,
  onPressSubmit,
  onPressDraft,
  onPressNotSave,
}: Props): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalAlertPublish
        visible={isModalAlert}
        isLoading={isLoading}
        isPublic={isPublic}
        onValueChangePublic={onValueChangePublic}
        onPressSubmit={onPressSubmit}
        onPressClose={onPressCloseModalPublish}
      />
      <ModalDiaryCancel
        visible={isModalCancel}
        isLoading={isLoading}
        onPressSave={onPressDraft}
        onPressNotSave={onPressNotSave}
        onPressClose={onPressCloseModalCancel}
      />
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={onChangeTextTitle}
        placeholder="Title"
        maxLength={100}
        autoCapitalize="none"
        keyboardType="default"
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={onChangeTextText}
          placeholder="本文"
          underlineColorAndroid="transparent"
          multiline
          autoCapitalize="none"
          keyboardType="default"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PostDiary;
