import React, { useRef } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../utils/I18n';
import { fontSizeM, primaryColor, subTextColor } from '../../styles/Common';
import { Hoverable } from '../atoms';

interface Props {
  summary: string;
  onHideKeyboard: () => void;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 12,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginLeft: 2,
  },
  textInputSummary: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
});

const CorrectingSummaryNative: React.FC<Props> = ({
  summary,
  onHideKeyboard,
  onChangeText,
}) => {
  const refSummary = useRef<TextInput | null>(null);
  return (
    <>
      <Hoverable
        style={styles.buttonRow}
        onPress={(): void => {
          if (refSummary.current) refSummary.current.focus();
        }}
      >
        <MaterialCommunityIcons size={22} color={subTextColor} name="plus" />
        <Text style={styles.label}>{I18n.t('correcting.summary')}</Text>
      </Hoverable>
      {/* まとめは改行がある。他のはない */}
      <TextInput
        ref={refSummary}
        style={styles.textInputSummary}
        value={summary}
        multiline
        autoCapitalize="none"
        spellCheck
        autoCorrect
        underlineColorAndroid="transparent"
        scrollEnabled={false}
        onChangeText={onChangeText}
        onBlur={onHideKeyboard}
      />
    </>
  );
};

export default CorrectingSummaryNative;
