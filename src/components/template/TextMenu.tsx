import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import * as Speech from 'expo-speech';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import I18n from '../../utils/I18n';
import { clipboard } from '../../styles/Common';
import ModalSpeech from '../organisms/ModalSpeech';
import { Language } from '../../types';

interface Props {
  children: React.ReactNode;
  isTranslated: boolean;
  text: string;
  displayText: string;
  textLanguage?: Language;
  onPressTranslate: () => void;
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: -66,
    left: 30,
    width: 260,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: clipboard,
    borderRadius: 8,
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    width: 90,
  },
  menuText: {
    marginTop: 4,
    color: 'white',
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: clipboard,
    transform: [{ rotate: '180deg' }],
  },
});

// 補足
// ポーズから再生する時と、最初から再生するときの制御を行ったため、少し複雑になっている
const TextMenu = ({
  children,
  isTranslated,
  text,
  displayText,
  textLanguage,
  onPressTranslate,
}: Props): JSX.Element => {
  const [visibleSpeech, setVisibleSpeech] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  // 再生中のアイコンを制御
  const [playing, setPlaying] = useState(false);
  // 一番最初から再生
  const [initial, setInitial] = useState(false);

  const onDone = (): void => {
    setPlaying(false);
    setInitial(true);
  };

  const onSpeak = (): void => {
    const option = {
      language: textLanguage,
      rate: isSlow ? 0.6 : 1.0,
      onDone,
    };
    if (isTranslated) {
      Speech.speak(displayText, option);
    } else {
      Speech.speak(text, option);
    }
    setInitial(false);
    setPlaying(true);
  };

  const onPressSpeech = (): void => {
    setVisibleSpeech(true);
  };

  const onPressClose = (): void => {
    Speech.stop();
    setVisibleSpeech(false);
    setPlaying(false);
  };

  const onPressSpeak = (): void => {
    if (initial) {
      onSpeak();
    } else {
      Speech.resume();
      setPlaying(true);
    }
  };

  const onPressPause = (): void => {
    Speech.pause();
    setPlaying(false);
  };

  const onPressCopy = (): void => {
    if (isTranslated) {
      Clipboard.setString(displayText);
    } else {
      Clipboard.setString(text);
    }
  };

  const copyButton = (
    <MenuOption style={[styles.menu, styles.border]} onSelect={onPressCopy}>
      <MaterialCommunityIcons size={20} color="white" name="content-copy" />
      <Text style={styles.menuText}>{I18n.t('common.copy')}</Text>
    </MenuOption>
  );

  const translateButton = (
    <MenuOption style={styles.menu} onSelect={onPressTranslate}>
      <MaterialCommunityIcons size={20} color="white" name="translate" />
      <Text style={styles.menuText}>{I18n.t('common.translation')}</Text>
    </MenuOption>
  );

  const speechButton = (
    <MenuOption style={styles.menu} onSelect={onPressSpeech}>
      <MaterialCommunityIcons size={20} color="white" name="volume-high" />
      <Text style={styles.menuText}>{I18n.t('common.speech')}</Text>
    </MenuOption>
  );

  // AndroidのMenuOptionのonSlectが機能しない為
  const renderMenuButton = (): JSX.Element => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.row}>
          {copyButton}
          {translateButton}
          {speechButton}
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={onPressCopy}>{copyButton}</TouchableOpacity>
        <TouchableOpacity onPress={onPressTranslate}>
          {translateButton}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSpeech}>
          {speechButton}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <ModalSpeech
        visible={visibleSpeech}
        playing={playing}
        isSlow={isSlow}
        disabledSwitch={!initial}
        onValueChange={(): void => setIsSlow(!isSlow)}
        text={text}
        onPressSpeak={onPressSpeak}
        onPressPause={onPressPause}
        onPressClose={onPressClose}
      />
      <Menu>
        <MenuTrigger>{children}</MenuTrigger>
        <MenuOptions>
          <View style={styles.menuContainer}>
            {renderMenuButton()}
            <View style={styles.triangle} />
          </View>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default TextMenu;
