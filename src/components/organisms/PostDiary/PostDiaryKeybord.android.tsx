import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '@/styles/Common';
import { TextInputText, Hoverable, TextInputTitle } from '@/components/atoms';
import { getMaxPostText } from '@/utils/diary';
import Footer from './Footer';
import { PostDiaryKeyboardProps } from './interface';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  textInput: {
    height: 400,
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
});

const PostDiaryKeybordAndroid: React.FC<PostDiaryKeyboardProps> = ({
  title,
  text,
  learnLanguage,
  subcatergoryInfo,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
  onFocusText,
  onBlurText,
  onPressThemeGuide,
}) => {
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
          <TextInputTitle
            editable={!subcatergoryInfo}
            value={title}
            onFocus={onFocusText}
            onChangeText={onChangeTextTitle}
          />
          <TextInputText
            style={styles.textInput}
            value={text}
            maxLength={getMaxPostText(learnLanguage)}
            onChangeText={onChangeTextText}
            onFocus={onFocusText}
            onBlur={onBlurText}
          />
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView>
        {isKeyboard ? null : (
          <Footer
            subcatergoryInfo={subcatergoryInfo}
            onPressThemeGuide={onPressThemeGuide}
            onPressDraft={onPressDraft}
          />
        )}
      </SafeAreaView>
      {isKeyboard ? (
        <Hoverable style={styles.icon} onPress={Keyboard.dismiss}>
          <MaterialCommunityIcons
            size={24}
            color={mainColor}
            name="keyboard-close"
          />
        </Hoverable>
      ) : null}
    </View>
  );
};

export default PostDiaryKeybordAndroid;
