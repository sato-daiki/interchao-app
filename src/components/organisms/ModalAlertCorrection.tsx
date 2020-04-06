import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
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
  icon: {
    alignSelf: 'center',
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  onPressSubmit: (checked: boolean) => void;
  onPressClose: () => void;
}

const ModalAlertCorrection: React.FC<Props> = ({
  visible,
  isLoading,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  const [checked, setChecked] = useState(false);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>確認</Text>
        <View style={styles.line} />
        <MaterialCommunityIcons
          style={styles.icon}
          name="pencil-lock"
          size={64}
          color={primaryColor}
        />
        <Space size={16} />
        <Text style={styles.text}>
          添削は30分以内で行ってください。30分をすぎると添削は破棄されます。
          {'\n'}
          {'\n'}
          本サービスは、１日記につき、１添削で行っています。添削を始めると、ロックがかかり他の人は添削できなくなります。
        </Text>
        <Space size={32} />
        <SubmitButton
          isLoading={isLoading}
          title="添削を始める"
          onPress={(): void => onPressSubmit(checked)}
        />
        <Space size={12} />
        <View style={styles.row}>
          <Checkbox
            checked={checked}
            onPress={(): void => setChecked(!checked)}
          />
          <Text style={styles.checkboxText}>
            以後、このメッセージを表示しない
          </Text>
        </View>
        <Space size={24} />
        <WhiteButton title="キャンセル" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalAlertCorrection;
