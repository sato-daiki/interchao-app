import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
  fontSizeS,
  subTextColor,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space, Checkbox } from '../atoms';

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    paddingLeft: 8,
    fontSize: fontSizeS,
    color: subTextColor,
  },
});

interface Props {
  visible: boolean;
  onPressClose: () => void;
}

const ModalAlertCorrection: React.FC<Props> = ({
  visible,
  onPressClose,
}: Props): JSX.Element | null => {
  const onPressSubmit = useCallback(() => {}, []);
  const [checked, setChecked] = useState(false);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>確認</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          添削は30分以内で行ってください。30分をすぎると添削は破棄されます。
          {'\n'}
          {'\n'}
          本サービスは、１日記につき、１添削で行っています。添削を始めると、ロックがかかり他の人は添削できなくなります。
        </Text>
        <Space size={32} />
        <SubmitButton title="投稿する" onPress={onPressSubmit} />
        <Space size={8} />
        <View style={styles.row}>
          <Checkbox
            checked={checked}
            color={subTextColor}
            onPress={(): void => setChecked(!checked)}
          />
          <Text style={styles.checkboxText}>
            以後、このメッセージを表示しない
          </Text>
        </View>
        <Space size={16} />
        <WhiteButton title="キャンセル" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalAlertCorrection;
