import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import I18n from '../../utils/I18n';
import { fontSizeM, subTextColor } from '../../styles/Common';
import { AutoHeightTextInput } from '../atoms';

interface Props {
  detail: string;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  detailLabel: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginBottom: 8,
  },
});

const CorrectingCommentWeb: React.FC<Props> = ({ detail, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detailLabel}>{I18n.t('commentCard.detail')}</Text>
      <AutoHeightTextInput
        placeholder={I18n.t('commentCard.optional')}
        value={detail}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CorrectingCommentWeb;
