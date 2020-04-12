import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { Space, SubmitButton } from '../atoms';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

interface Props {
  visible: boolean;
  onPressClose: () => void;
}

const ModalTimeUp: React.FC<Props> = ({
  visible,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('modalTimeUp.title')}</Text>
        <View style={styles.line} />
        <Space size={16} />
        <MaterialCommunityIcons
          size={64}
          color={primaryColor}
          name="timer-off"
        />
        <Space size={16} />
        <Text style={styles.text}>{I18n.t('modalTimeUp.text')}</Text>
        <Space size={32} />
        <SubmitButton title="OK" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalTimeUp;
