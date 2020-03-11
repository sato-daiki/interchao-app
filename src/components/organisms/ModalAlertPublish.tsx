import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
  subTextColor,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';

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
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  subTitle: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  description: {
    fontSize: fontSizeM,
    color: subTextColor,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: fontSizeM,
    color: primaryColor,
  },
  button: {
    paddingHorizontal: 16,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    textAlign: 'center',
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  isPublic: boolean;
  onValueChangePublic: () => void;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalAlertPublish: React.FC<Props> = ({
  visible,
  isLoading,
  isPublic,
  onValueChangePublic,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>確認</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          10ポイントを使い日記を投稿します。
          {'\n'}
          一度投稿すると、編集ができません。
        </Text>
        <Text style={styles.subTitle}>公開設定</Text>
        <Text style={styles.description}>
          InterChaoはWeb上でも添削された日記を閲覧できます。Webで公開すると他の学習者の手助けになります。公開設定は後からでも変更可能です。
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Webで公開</Text>
          <Switch onValueChange={onValueChangePublic} value={isPublic} />
        </View>
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title="投稿する"
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <WhiteButton title="キャンセル" onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlertPublish;
