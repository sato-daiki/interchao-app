import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { WhiteButton, Space, UserPointsBig } from '../atoms';
import { GetPoints } from '../../images';

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
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    width: 160,
    height: 160,
  },
});

interface Props {
  visible: boolean;
  points: number;
  onPressClose: () => void;
}

const ModalCorrectingDone: React.FC<Props> = ({
  visible,
  points,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>添削完了</Text>
        <View style={styles.line} />
        <Image style={styles.img} source={GetPoints} />
        <Space size={32} />
        <Text style={styles.text}>
          添削ありがとうございます。10ポイント獲得。
        </Text>
        <Space size={24} />
        <UserPointsBig points={points} />
        <Space size={32} />
        <WhiteButton title="閉じる" onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalCorrectingDone;
