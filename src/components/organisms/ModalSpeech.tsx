import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { Language } from '@/types';
import I18n from '@/utils/I18n';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Modal } from '@/components/template';
import { WhiteButton, Space, HoverableIcon } from '@/components/atoms';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  switchContainer: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: primaryColor,
    fontSize: fontSizeM,
    marginLeft: 8,
  },
});

interface Props {
  visible: boolean;
  text: string;
  textLanguage?: Language;
  onClose: () => void;
}

const ModalSpeech: React.FC<Props> = ({ visible, text, textLanguage, onClose }: Props) => {
  const [isSlow, setIsSlow] = useState(false);

  // 再生中のアイコンを制御
  const [playing, setPlaying] = useState(false);
  // 一番最初から再生
  const [initial, setInitial] = useState(true);

  const onDone = useCallback((): void => {
    setPlaying(false);
    setInitial(true);
  }, []);

  const onSpeak = useCallback((): void => {
    const option = {
      language: textLanguage,
      rate: isSlow ? 0.6 : 1.0,
      onDone,
    };
    Speech.speak(text, option);
    setInitial(false);
    setPlaying(true);
  }, [isSlow, onDone, text, textLanguage]);

  const onPressClose = useCallback((): void => {
    Speech.stop();
    onClose();
    setPlaying(false);
    setInitial(true);
  }, [onClose]);

  const onPressSpeak = useCallback((): void => {
    if (initial) {
      onSpeak();
    } else {
      Speech.resume();
      setPlaying(true);
    }
  }, [initial, onSpeak]);

  const onPressPause = useCallback((): void => {
    if (Platform.OS === 'ios') {
      Speech.pause();
      setPlaying(false);
    } else {
      // Androidはpauseとresumeをサポートしていない
      Speech.stop();
      setInitial(true);
      setPlaying(false);
    }
  }, []);

  return (
    <Modal visible={visible}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
          <Space size={16} />
          <HoverableIcon
            icon='community'
            name={playing ? 'pause' : 'play'}
            size={48}
            hoverBorderRadius={32}
            color={primaryColor}
            onPress={playing ? onPressPause : onPressSpeak}
          />
          <View style={styles.switchContainer}>
            <Switch
              thumbColor='white'
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              onValueChange={(): void => setIsSlow(!isSlow)}
              value={isSlow}
              disabled={!initial}
            />
            <Text style={styles.switchText}>{I18n.t('common.slow')}</Text>
          </View>
          <Space size={32} />
          <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalSpeech;
