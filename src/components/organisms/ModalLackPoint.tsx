import React, { useCallback } from 'react';
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
    paddingBottom: 24,
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

const ModalLackPoint: React.FC<Props> = ({
  visible,
  onPressClose,
}: Props): JSX.Element | null => {
  const onPressSubmit = useCallback(() => {}, []);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>確認</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          ポイントが足りません。日記を書くに100ポイントが必要です。
          {'\n'}
          {'\n'}
          日本語の日記を添削すると100ポイント、添削結果をレビューすると10ポイントが貰えます。
          {'\n'}
          {'\n'}
          また、ポイントとは購入することもできます。
        </Text>
        <Space size={32} />
        <SubmitButton title="ポイントを購入する" onPress={onPressSubmit} />
        <Space size={16} />
        <WhiteButton title="キャンセル" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalLackPoint;
