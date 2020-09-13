import React from 'react';
import { View, StyleSheet, Text, ScrollView, Switch } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { Modal } from '../template';
import { WhiteButton, Space, HoverableIcon } from '../atoms';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
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
  playing: boolean;
  isSlow: boolean;
  disabledSwitch: boolean;
  text: string;
  onPressSpeak: () => void;
  onPressPause: () => void;
  onPressClose: () => void;
  onValueChange: () => void;
}

const ModalSpeech: React.FC<Props> = ({
  visible,
  playing,
  isSlow,
  disabledSwitch,
  text,
  onPressSpeak,
  onPressPause,
  onPressClose,
  onValueChange,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
          <Space size={16} />
          <HoverableIcon
            icon="community"
            name={playing ? 'pause' : 'play'}
            size={48}
            hoverBorderRadius={32}
            color={primaryColor}
            onPress={playing ? onPressPause : onPressSpeak}
          />
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              onValueChange={onValueChange}
              value={isSlow}
              disabled={disabledSwitch}
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
