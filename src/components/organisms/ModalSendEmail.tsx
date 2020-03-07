import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { WhiteButton, Space } from '../atoms';

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
  onPressClose: () => void;
}

const ModalSendEmail: React.FC<Props> = ({
  visible,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>メール送信</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          メールを送信しました。メールのリンクからパスワードを再設定してください。
        </Text>
        <Space size={32} />
        <WhiteButton title="閉じる" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalSendEmail;
