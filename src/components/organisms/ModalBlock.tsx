import React, { useCallback, useState } from 'react';
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
  isSuccess: boolean;
  isLoading: boolean;
  userName: string;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalBlock: React.FC<Props> = ({
  visible,
  isSuccess,
  isLoading,
  userName,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  const title = !isSuccess
    ? `${userName}をブロックしますか？`
    : `${userName}をブロックしました`;

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <Text style={styles.text}>
              ブロックした人はあなたのプロフィールや日記を見られなくなります。ブロックしたことは、相手に通知されません。
            </Text>
            <Space size={32} />
            <SubmitButton
              isLoading={isLoading}
              title="ブロックする"
              onPress={onPressSubmit}
            />
            <Space size={16} />
            <WhiteButton title="キャンセル" onPress={onPressClose} />
          </>
        ) : (
          <>
            <Text style={styles.text}>
              ブロックした相手のプロフィールから、いつでもブロックを解除できます。
            </Text>
            <Space size={32} />
            <WhiteButton title="閉じる" onPress={onPressClose} />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalBlock;
