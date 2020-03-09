import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  },
});

interface Props {
  visible: boolean;
  title: string;
  message: string;
  mainButtonText: string;
  cancelButtonText?: string;
  onPressMain: () => void;
  onPressClose: () => void;
}

const ModalConfirm: React.FC<Props> = ({
  visible,
  title,
  message,
  mainButtonText,
  cancelButtonText = 'キャンセル',
  onPressMain,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        <Text style={styles.text}>{message}</Text>
        <Space size={32} />
        <SubmitButton title={mainButtonText} onPress={onPressMain} />
        <Space size={16} />
        <WhiteButton title={cancelButtonText} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalConfirm;
