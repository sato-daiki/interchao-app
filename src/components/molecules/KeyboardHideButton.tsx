import React, { useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  View,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { mainColor } from '../../styles/Common';

interface Props {
  isKeyboard: boolean;
  setIsKeyboard: (isKeyboard: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 2,
    zIndex: 10,
    right: 0,
  },
  keyboard: {
    width: 40,
    alignItems: 'center',
  },
});

const KeyboardHideButton: React.FC<Props> = ({
  isKeyboard,
  setIsKeyboard,
}): JSX.Element => {
  useEffect(() => {
    // androidはwillShowをサポートしていない。 willじゃないと遅いのでiosのみwillにする
    // hideはTextInputの方で管理しているから親から降りてくる
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboard(true);
      }
    );

    return (): void => {
      keyboardShowListener.remove();
    };
  }, [setIsKeyboard]);

  return (
    <View style={styles.container}>
      {isKeyboard ? (
        <TouchableOpacity onPress={Keyboard.dismiss} style={styles.keyboard}>
          <MaterialCommunityIcons
            size={24}
            color={mainColor}
            name="keyboard-close"
          />
        </TouchableOpacity>
      ) : null}
      {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </View>
  );
};

export default KeyboardHideButton;
