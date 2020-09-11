import React, { useRef } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../utils/I18n';
import { fontSizeM, primaryColor, subTextColor } from '../../styles/Common';
import { Hoverable } from '../atoms';

interface Props {
  detail: string;
  onBlurDetail: () => void;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  buttonRow: {
    marginLeft: -4,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: fontSizeM,
    color: subTextColor,
  },
  textInputDetail: {
    marginRight: 16,
    lineHeight: fontSizeM * 1.1,
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const CorrectingCommentNative: React.FC<Props> = ({
  detail,
  onBlurDetail,
  onChangeText,
}) => {
  const refDetail = useRef<any>(null);

  return (
    <>
      <Hoverable
        style={styles.buttonRow}
        onPress={(): void => {
          refDetail.current.focus();
        }}
      >
        <MaterialCommunityIcons size={22} color={subTextColor} name="plus" />
        <Text style={styles.detailLabel}>{I18n.t('commentCard.detail')}</Text>
      </Hoverable>
      <TextInput
        ref={refDetail}
        style={styles.textInputDetail}
        value={detail}
        multiline
        blurOnSubmit
        autoCapitalize="none"
        spellCheck
        autoCorrect
        underlineColorAndroid="transparent"
        returnKeyType="done"
        scrollEnabled={false}
        onBlur={onBlurDetail}
        onChangeText={onChangeText}
      />
    </>
  );
};

export default CorrectingCommentNative;
