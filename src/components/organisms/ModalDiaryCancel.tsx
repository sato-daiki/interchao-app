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
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  onPressSave: () => void;
  onPressNotSave: () => void;
  onPressClose: () => void;
}

const ModalDiaryCancel: React.FC<Props> = ({
  visible,
  isLoading,
  onPressSave,
  onPressNotSave,
  onPressClose,
}: Props): JSX.Element | null => (
  <Modal visible={visible}>
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{I18n.t('modalDiaryCancel.message')}</Text>
      <Space size={32} />
      <SubmitButton
        isLoading={isLoading}
        title={I18n.t('modalDiaryCancel.button')}
        onPress={(): void => onPressSave()}
      />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.close')} onPress={onPressNotSave} />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
    </View>
  </Modal>
);

export default ModalDiaryCancel;
