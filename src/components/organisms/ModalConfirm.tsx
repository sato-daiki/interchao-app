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
import I18n from '../../utils/I18n';

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
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
});

interface Props {
  visible: boolean;
  isLoading?: boolean;
  title: string;
  message: string;
  mainButtonText?: string;
  cancelButtonText?: string;
  onPressMain?: () => void;
  onPressClose?: () => void;
}

const ModalConfirm: React.FC<Props> = ({
  visible,
  isLoading = false,
  title,
  message,
  mainButtonText = '',
  cancelButtonText = I18n.t('common.cancel'),
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
        {onPressMain ? (
          <>
            <SubmitButton
              isLoading={isLoading}
              title={mainButtonText}
              onPress={onPressMain}
            />
            <Space size={16} />
          </>
        ) : null}
        {onPressClose ? (
          <WhiteButton title={cancelButtonText} onPress={onPressClose} />
        ) : null}
      </View>
    </Modal>
  );
};

export default ModalConfirm;
