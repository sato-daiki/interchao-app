import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextButtun } from '../atoms';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  mainColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  title: string;
  text: string;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onFocusText: () => void;
  onEndEditingText: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    height: 400,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  footer: {
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const PostDiaryKeybordAndroid = ({
  title,
  text,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
  onFocusText,
  onEndEditingText,
}: Props): JSX.Element => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const onKeyboardDidShow = (): void => {
    setIsKeyboard(true);
  };

  const onKeyboardDidHide = (): void => {
    setIsKeyboard(false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    // cleanup function
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-180}
        style={styles.container}
        behavior="height"
      >
        <View style={styles.inner}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={onChangeTextTitle}
            placeholder="Title"
            maxLength={100}
            autoCorrect={false}
            keyboardType="default"
            underlineColorAndroid="transparent"
            spellCheck
          />
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={onChangeTextText}
            onFocus={onFocusText}
            onEndEditing={onEndEditingText}
            placeholder={I18n.t('postDiaryComponent.textPlaceholder')}
            underlineColorAndroid="transparent"
            multiline
            autoCorrect={false}
            keyboardType="default"
            spellCheck
          />
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView>
        {isKeyboard ? null : (
          <View style={styles.footer}>
            <TextButtun
              isBorrderTop
              isBorrderBottom
              title={I18n.t('postDiaryComponent.draft')}
              onPress={onPressDraft}
            />
          </View>
        )}
      </SafeAreaView>
      {isKeyboard ? (
        <TouchableOpacity onPress={Keyboard.dismiss} style={styles.icon}>
          <MaterialCommunityIcons
            size={24}
            color={mainColor}
            name="keyboard-close"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PostDiaryKeybordAndroid;
