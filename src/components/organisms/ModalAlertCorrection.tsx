import React, { useState } from 'react';
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
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';

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
  // row: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // checkboxText: {
  //   paddingLeft: 8,
  //   fontSize: fontSizeS,
  //   color: subTextColor,
  // },
  icon: {
    alignSelf: 'center',
  },
});

interface Props {
  visible: boolean;
  animationOut?: any;
  isLoading: boolean;
  onPressSubmit: (checked: boolean) => void;
  onPressClose: () => void;
}

const ModalAlertCorrection: React.FC<Props> = ({
  visible,
  animationOut,
  isLoading,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  const [checked, setChecked] = useState(false);

  return (
    <Modal visible={visible} animationOut={animationOut}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
        <View style={styles.line} />
        <MaterialCommunityIcons
          style={styles.icon}
          name="pencil-lock"
          size={64}
          color={primaryColor}
        />
        <Space size={16} />
        <Text style={styles.text}>{I18n.t('modalAlertCorrection.text')}</Text>
        <Space size={32} />
        <SubmitButton
          isLoading={isLoading}
          title={I18n.t('modalAlertCorrection.start')}
          onPress={(): void => onPressSubmit(checked)}
        />
        <Space size={16} />
        {/* <View style={styles.row}>
          <Checkbox
            checked={checked}
            onPress={(): void => setChecked(!checked)}
          />
          <Text style={styles.checkboxText}>
            {I18n.t('modalAlertCorrection.checkboxText')}
          </Text>
        </View> */}
        {/* <Space size={24} /> */}
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalAlertCorrection;
