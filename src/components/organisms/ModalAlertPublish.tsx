import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space, UserPointsBig } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  visible: boolean;
  isLoading: boolean;
  // isPublic: boolean;
  usePoints: number;
  points: number;
  // onValueChangePublic: () => void;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  line: {
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  // subTitle: {
  //   fontSize: fontSizeM,
  //   color: primaryColor,
  //   fontWeight: 'bold',
  //   paddingHorizontal: 16,
  //   paddingBottom: 8,
  // },
  // description: {
  //   fontSize: fontSizeM,
  //   color: subTextColor,
  //   paddingHorizontal: 16,
  //   paddingBottom: 16,
  //   lineHeight: fontSizeM * 1.3,
  // },
  // row: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   paddingVertical: 12,
  //   paddingHorizontal: 16,
  //   borderColor: borderLightColor,
  //   borderWidth: StyleSheet.hairlineWidth,
  // },
  // label: {
  //   fontSize: fontSizeM,
  //   color: primaryColor,
  // },
  button: {
    paddingHorizontal: 16,
  },
  points: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});

const ModalAlertPublish: React.FC<Props> = ({
  visible,
  isLoading,
  // isPublic,
  usePoints,
  points,
  // onValueChangePublic,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          {usePoints}
          {I18n.t('modalAlertPublish.confirmation')}
        </Text>
        <View style={styles.points}>
          <UserPointsBig points={points} />
        </View>
        {/*
        <Text style={styles.subTitle}>
          {I18n.t('modalAlertPublish.subTitle')}
        </Text>
        <Text style={styles.description}>
          {I18n.t('modalAlertPublish.description')}
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>
            {I18n.t('modalAlertPublish.publish')}
          </Text>
          <Switch onValueChange={onValueChangePublic} value={isPublic} />
        </View> */}
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('modalAlertPublish.submit')}
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlertPublish;
