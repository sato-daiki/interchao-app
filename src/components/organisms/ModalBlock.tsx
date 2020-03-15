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
  isBlocked: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  userName: string;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalBlock: React.FC<Props> = ({
  visible,
  isBlocked,
  isSuccess,
  isLoading,
  userName,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  let title = '';
  if (!isBlocked) {
    title = !isSuccess
      ? `${userName}をブロックしますか？`
      : `${userName}をブロックしました`;
  } else {
    title = !isSuccess
      ? `${userName}のブロックを解除しますか？`
      : `${userName}のブロックを解除しました`;
  }

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <Text style={styles.text}>
              {!isBlocked
                ? 'ブロックした人はあなたのプロフィールや日記を見られなくなります。ブロックしたことは、相手に通知されません。'
                : 'ブロックを解除すると、この人はあなたの日記を見たり、フォローできるようになります。ブロックが解除されたことは、相手に通知されません。'}
            </Text>
            <Space size={32} />
            <SubmitButton
              isLoading={isLoading}
              title={!isBlocked ? 'ブロックする' : 'ブロックを解除'}
              onPress={onPressSubmit}
            />
            <Space size={16} />
            <WhiteButton title="キャンセル" onPress={onPressClose} />
          </>
        ) : (
          <>
            <Text style={styles.text}>
              {!isBlocked
                ? 'ブロックした相手のプロフィールから、いつでもブロックを解除できます。'
                : '相手のプロフィールからいつでもブロックができます。'}
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
