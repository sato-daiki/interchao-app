import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Diary } from '../../types';
import {
  borderLightColor,
  fontSizeM,
  offWhite,
  primaryColor,
} from '../../styles/Common';
import { KeyboardHideButton } from '../molecules';

export interface Props {
  diary?: Diary;
  title: string;
  text: string;
  onChangeTextTitle: (title: string) => void;
  onChangeTextText: (text: string) => void;
  onFocus: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    marginBottom: 16,
  },
});

const FairCopyEdit: React.FC<Props> = ({
  diary,
  title,
  text,
  onChangeTextTitle,
  onChangeTextText,
  onFocus,
}) => {
  // keyboardはshowはKeyboardのaddListenerで管理し、HideはTextInputのendeditingで管理
  const [isKeyboard, setIsKeyboard] = useState(false);
  /* キーボード閉じる */
  const onHideKeyboard = (): void => {
    setIsKeyboard(false);
  };
  if (!diary) {
    return null;
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={32}
      >
        <TextInput
          style={styles.textInput}
          value={title}
          multiline
          underlineColorAndroid="transparent"
          autoCorrect={false}
          keyboardType="default"
          spellCheck
          onChangeText={onChangeTextTitle}
          onFocus={onFocus}
          onBlur={onHideKeyboard}
        />
        <TextInput
          style={styles.textInput}
          value={text}
          multiline
          underlineColorAndroid="transparent"
          autoCorrect={false}
          keyboardType="default"
          spellCheck
          onChangeText={onChangeTextText}
          onFocus={onFocus}
          onBlur={onHideKeyboard}
        />
      </KeyboardAwareScrollView>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </View>
  );
};

export default FairCopyEdit;
