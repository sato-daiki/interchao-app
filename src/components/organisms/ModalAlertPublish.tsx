import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space, UserPointsBig } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  visible: boolean;
  isLoading: boolean;
  usePoints: number;
  points: number;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  line: {
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  button: {
    paddingHorizontal: 16,
  },
  points: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});

const ModalAlertPublish: React.FC<Props> = ({
  visible,
  isLoading,
  usePoints,
  points,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          {I18n.t('modalAlertPublish.confirmation', { usePoints })}
        </Text>
        <View style={styles.points}>
          <UserPointsBig points={points} />
        </View>
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('modalAlertPublish.submit')}
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlertPublish;
