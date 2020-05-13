import React from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { TextButtun } from '../atoms';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 40,
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
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={20}
      style={styles.container}
      behavior="height"
    >
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
      <SafeAreaView>
        <View style={styles.footer}>
          <TextButtun
            isBorrderTop
            isBorrderBottom
            title={I18n.t('postDiaryComponent.draft')}
            onPress={onPressDraft}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostDiaryKeybordAndroid;
