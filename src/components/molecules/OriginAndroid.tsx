import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeM } from '../../styles/Common';
import { Space } from '../atoms';
import { EmptyList } from '.';
import I18n from '../../utils/I18n';

interface Props {
  isEmpty: boolean;
  text: string;
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 16,
    lineHeight: fontSizeM * 1.3,
  },
  empty: {
    paddingHorizontal: 16,
    lineHeight: fontSizeM * 1.3,
  },
});

const OriginAndroid = ({ text, isEmpty }: Props): JSX.Element => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(text);
    }, 100);
    return (): void => clearTimeout(timer);
  }, [text]);

  return (
    <>
      <Text style={styles.text} selectable>
        {displayText}
      </Text>
      {isEmpty ? (
        <View style={styles.empty}>
          <EmptyList
            iconName="cursor-pointer"
            message={I18n.t('correctionOrigin.messageAndroid')}
            paddingTop={32}
          />
          <Space size={32} />
        </View>
      ) : null}
    </>
  );
};

export default OriginAndroid;
