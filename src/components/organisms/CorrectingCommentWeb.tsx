import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import I18n from '../../utils/I18n';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  offWhite,
} from '../../styles/Common';
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
  textInputDetail: {
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 10,
    lineHeight: fontSizeM * 1.1,
    fontSize: fontSizeM,
    color: primaryColor,
    backgroundColor: offWhite,
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});

const CorrectingCommentWeb: React.FC<Props> = ({ detail, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detailLabel}>{I18n.t('commentCard.detail')}</Text>
      <AutoHeightTextInput
        style={styles.textInputDetail}
        placeholder={I18n.t('commentCard.optional')}
        value={detail}
        multiline
        blurOnSubmit
        autoCapitalize="none"
        spellCheck
        autoCorrect
        returnKeyType="done"
        scrollEnabled={false}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CorrectingCommentWeb;
