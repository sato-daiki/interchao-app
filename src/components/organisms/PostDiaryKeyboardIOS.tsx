import React from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Keyboard,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  isForce: boolean;
  fadeAnim: Animated.Value;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onFocusText: () => void;
  onBlurText: () => void;
}

const styles = StyleSheet.create({
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
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const PostDiaryKeyboardIOS = ({
  title,
  text,
  isForce,
  fadeAnim,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
  onFocusText,
  onBlurText,
}: Props): JSX.Element => {
  return (
    <>
      <TextInput
        style={styles.titleInput}
        value={title}
        placeholder="Title"
        maxLength={100}
        autoCorrect={false}
        keyboardType="default"
        underlineColorAndroid="transparent"
        spellCheck
        returnKeyType="done"
        onFocus={onFocusText}
        onChangeText={onChangeTextTitle}
      />
      <TextInput
        style={styles.textInput}
        value={text}
        placeholder={I18n.t('postDiaryComponent.textPlaceholder')}
        underlineColorAndroid="transparent"
        multiline
        autoCorrect={false}
        keyboardType="default"
        spellCheck
        onChangeText={onChangeTextText}
        onFocus={onFocusText}
        onBlur={onBlurText}
      />
      {isForce ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity onPress={Keyboard.dismiss} style={styles.icon}>
            <MaterialCommunityIcons
              size={24}
              color={mainColor}
              name="keyboard-close"
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
      <KeyboardSpacer />
      {/* 画面下部がiOSX以上の時隠れてしまうのを対応 */}
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
    </>
  );
};

export default PostDiaryKeyboardIOS;
