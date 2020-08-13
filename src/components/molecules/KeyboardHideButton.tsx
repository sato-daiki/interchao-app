import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../../styles/Common';

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 72 : 8,
    alignSelf: 'flex-end',
    right: 12,
    paddingTop: 4,
  },
  keyboard: {
    width: 40,
    alignItems: 'center',
  },
});

const KeyboardHideButton: React.FC = (): JSX.Element => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return (): void => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isKeyboardVisible ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={Keyboard.dismiss} style={styles.keyboard}>
            <MaterialCommunityIcons
              size={28}
              color={mainColor}
              name="keyboard-close"
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default KeyboardHideButton;
