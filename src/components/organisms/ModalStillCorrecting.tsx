import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
        <MaterialIcons name="error" size={64} color={primaryColor} />
        <Space size={16} />
        <Text style={styles.text}>途中で添削が中断されました。</Text>
        <Space size={32} />
        <SubmitButton title="閉じる" isLoading={isLoading} onPress={onPress} />
      </View>
    </Modal>
  );
};

export default ModalStillCorrecting;
