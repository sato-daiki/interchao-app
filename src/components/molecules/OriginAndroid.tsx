import React from 'react';
import { Text, StyleSheet } from 'react-native';
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
    flex: 1,
  },
});

const OriginAndroid = ({ text, isEmpty }: Props): JSX.Element => {
  return (
    <>
      <Text style={styles.text} selectable>
        {text}
      </Text>
      {isEmpty ? (
        <>
          <EmptyList
            iconName="cursor-pointer"
            message={I18n.t('correctionOrigin.message')}
            paddingTop={0}
          />
          <Space size={32} />
        </>
      ) : null}
    </>
  );
};

export default OriginAndroid;
