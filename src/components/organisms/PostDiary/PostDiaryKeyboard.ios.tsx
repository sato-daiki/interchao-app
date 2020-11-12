import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getMaxPostText } from '@/utils/diary';
import { offWhite, mainColor } from '@/styles/Common';
import { TextInputText, Hoverable, TextInputTitle } from '@/components/atoms';
import Footer from './Footer';
import { PostDiaryKeyboardProps } from './interface';

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

const PostDiaryKeyboardIOS: React.FC<PostDiaryKeyboardProps> = ({
  title,
  text,
  learnLanguage,
  isForce,
  subcatergoryInfo,
  fadeAnim,
  onPressThemeGuide,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
  onFocusText,
  onBlurText,
}) => {
  return (
    <>
      <TextInputTitle
        editable={!subcatergoryInfo}
        value={title}
        onFocus={onFocusText}
        onChangeText={onChangeTextTitle}
      />
      <TextInputText
        value={text}
        maxLength={getMaxPostText(learnLanguage)}
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
        <Footer
          subcatergoryInfo={subcatergoryInfo}
          onPressThemeGuide={onPressThemeGuide}
          onPressDraft={onPressDraft}
        />
      </SafeAreaView>
    </>
  );
};

export default PostDiaryKeyboardIOS;
