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
  userName: string;
  onPressClose: () => void;
}

const ModalUnBlock: React.FC<Props> = ({
  visible,
  userName,
  onPressClose,
}: Props): JSX.Element | null => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onPressSubmit = useCallback(() => {
    setIsSuccess(true);
  }, []);

  const title = !isSuccess
    ? `${userName}のブロックを解除しますか？`
    : `${userName}のブロックを解除しました`;

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <Text style={styles.text}>
              ブロックを解除すると、この人はあなたの日記を見たり、フォローできるようになります。ブロックが解除されたことは、相手に通知されません。
            </Text>
            <Space size={32} />
            <SubmitButton title="ブロックを解除" onPress={onPressSubmit} />
            <Space size={16} />
            <WhiteButton title="キャンセル" onPress={onPressClose} />
          </>
        ) : (
          <>
            <Text style={styles.text}>
              相手のプロフィールからいつでもブロックができます。
            </Text>
            <Space size={32} />
            <WhiteButton title="閉じる" onPress={onPressClose} />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalUnBlock;
