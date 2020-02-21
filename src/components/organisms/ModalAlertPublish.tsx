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

const ModalAlertPublish: React.FC<Props> = ({
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
          一度投稿すると、編集ができません。よろしいですか？
        </Text>
        <Space size={32} />
        <SubmitButton title="送信する" onPress={onPressSubmit} />
        <Space size={16} />
        <WhiteButton title="キャンセル" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalAlertPublish;
