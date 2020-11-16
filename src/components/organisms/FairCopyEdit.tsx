import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  borderLightColor,
  fontSizeM,
  offWhite,
  primaryColor,
} from '../../styles/Common';
import { KeyboardHideButton } from '../molecules';
import { Space, TextInputText, TextInputTitle } from '../atoms';

export interface Props {
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
  },
  scrollView: {
    paddingBottom: 32,
    paddingTop: 12,
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
    borderBottomWidth: 0,
  },
});

const FairCopyEdit: React.FC<Props> = ({
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
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={32}
      >
        <TextInputTitle
          editable
          style={styles.textInput}
          value={title}
          onChangeText={onChangeTextTitle}
          onFocus={onFocus}
          onBlur={onHideKeyboard}
        />
        <TextInputText
          style={styles.textInput}
          value={text}
          onChangeText={onChangeTextText}
          onFocus={onFocus}
          onBlur={onHideKeyboard}
        />
        <Space size={32} />
      </KeyboardAwareScrollView>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </View>
  );
};

export default FairCopyEdit;
