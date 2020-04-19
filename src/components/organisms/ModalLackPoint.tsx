import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';
import { SavePoints } from '../../images';

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
    textAlign: 'center',
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    alignSelf: 'center',
    width: 160,
    height: 160,
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
        <Text style={styles.title}>{I18n.t('modalLackPoint.title')}</Text>
        <View style={styles.line} />
        <Image style={styles.img} source={SavePoints} />
        <Space size={32} />
        <Text style={styles.text}>{I18n.t('modalLackPoint.text')}</Text>
        <Space size={32} />
        <SubmitButton
          title={I18n.t('modalLackPoint.submit')}
          onPress={onPressSubmit}
        />
        <Space size={16} />
        <WhiteButton
          title={I18n.t('modalLackPoint.close')}
          onPress={onPressClose}
        />
      </View>
    </Modal>
  );
};

export default ModalLackPoint;
