import React, { useState } from 'react';
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
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  isPublic: boolean;
  onPressSubmit: (changedIsPublic: boolean) => void;
  onPressClose: () => void;
}

const ModalEditPublic: React.FC<Props> = ({
  visible,
  isLoading,
  isPublic,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  const [changedIsPublic, setChangedIsPublic] = useState(isPublic);
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>公開設定を変更する</Text>
        <View style={styles.line} />
        <Text style={styles.description}>
          InterChaoはWeb上でも添削された日記を閲覧できます。Webで公開すると、TwitterやFacebookで添削結果を投稿することができます。また、他の学習者の手助けになります。
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Webで公開</Text>
          <Switch
            onValueChange={(): void => setChangedIsPublic(!changedIsPublic)}
            value={changedIsPublic}
          />
        </View>
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title="更新する"
            onPress={(): void => onPressSubmit(changedIsPublic)}
          />
          <Space size={16} />
          <WhiteButton title="キャンセル" onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditPublic;