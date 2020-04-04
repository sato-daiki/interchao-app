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
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalLackPoint: React.FC<Props> = ({
  visible,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>ポイント不足</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          ポイントが足りません。日記を投稿するには600文字ごとに10ポイントが必要です。
          {'\n'}
          {'\n'}
          日本語の日記を添削すると10ポイントが貰えます。
          {'\n'}
          {'\n'}
          下書き保存はポイントの消費なしでできます。
        </Text>
        <Space size={32} />
        <SubmitButton title="続ける" onPress={onPressSubmit} />
        <Space size={16} />
        <WhiteButton title="添削する日記を探す" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalLackPoint;
