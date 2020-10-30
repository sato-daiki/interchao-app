import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Language } from '@/types';
import { TextButtun, TextInputTitle, TextInputText, Hoverable } from '../atoms';
import { offWhite, mainColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  title: string;
  text: string;
  learnLanguage: Language;
  isForce: boolean;
  fadeAnim: Animated.Value;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onFocusText: () => void;
  onBlurText: () => void;
}

const styles = StyleSheet.create({
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
  learnLanguage,
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
      <TextInputTitle
        value={title}
        onFocus={onFocusText}
        onChangeText={onChangeTextTitle}
      />
      <TextInputText
        value={text}
        learnLanguage={learnLanguage}
        onFocus={onFocusText}
        onChangeText={onChangeTextText}
        onBlur={onBlurText}
      />
      {isForce ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Hoverable style={styles.icon} onPress={Keyboard.dismiss}>
            <MaterialCommunityIcons
              size={24}
              color={mainColor}
              name="keyboard-close"
            />
          </Hoverable>
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
