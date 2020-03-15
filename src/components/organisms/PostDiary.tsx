import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { LoadingModal, TextButtun } from '../atoms';
import { ModalAlertPublish } from '.';
import ModalDiaryCancel from './ModalDiaryCancel';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';

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
    <View style={styles.container}>
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
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TextButtun isBorrderTop title="下書き" onPress={onPressDraft} />
        </View>
      </View>
    </View>
  );
};

export default PostDiary;