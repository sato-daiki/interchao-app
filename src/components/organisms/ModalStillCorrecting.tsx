import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, Space } from '../atoms';

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
  isLoading: boolean;
  onPress: () => void;
}

const ModalStillCorrecting: React.FC<Props> = ({
  visible,
  isLoading,
  onPress,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>エラー</Text>
        <View style={styles.line} />
        <Text style={styles.text}>添削が途中で中断されました</Text>
        <Space size={32} />
        <SubmitButton title="閉じる" isLoading={isLoading} onPress={onPress} />
      </View>
    </Modal>
  );
};

export default ModalStillCorrecting;
