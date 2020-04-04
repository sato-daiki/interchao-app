import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoadingModal, TextButtun } from '../atoms';
import { ModalAlertPublish } from '.';
import ModalDiaryCancel from './ModalDiaryCancel';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  mainColor,
} from '../../styles/Common';

const { height } = Dimensions.get('window');
const defaultHeight = height - 520;

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
    backgroundColor: offWhite,
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
    backgroundColor: '#fff',
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 4,
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
});

const PointShort = ({
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
  const [isForce, setIsForce] = useState(false);

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
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
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
          onFocus={(): void => setIsForce(true)}
          onEndEditing={(): void => setIsForce(false)}
          placeholder="本文"
          underlineColorAndroid="transparent"
          multiline
          autoCapitalize="none"
          keyboardType="default"
        />
        {/* keybordアイコン自体はクリックしても意味がない */}
        {isForce ? (
          <View style={styles.icon}>
            <MaterialCommunityIcons
              size={28}
              color={mainColor}
              name="keyboard-close"
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
      <TextButtun
        isBorrderTop
        isBorrderBottom
        title="下書き"
        onPress={onPressDraft}
      />
    </SafeAreaView>
  );
};

export default PointShort;
