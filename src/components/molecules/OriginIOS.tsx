import React from 'react';
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { fontSizeM } from '../../styles/Common';
import { Space } from '../atoms';
import { EmptyList } from '.';
import I18n from '../../utils/I18n';

interface Props {
  isEmpty: boolean;
  text: string;
  onSelectionChange: (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => void;
}

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 16,
    lineHeight: fontSizeM * 1.3,
    flex: 1,
  },
});

const OriginIOS = ({
  text,
  isEmpty,
  onSelectionChange,
}: Props): JSX.Element => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        multiline
        editable={false}
        value={text}
        selectTextOnFocus
        onSelectionChange={onSelectionChange}
        contextMenuHidden
        scrollEnabled={false}
        underlineColorAndroid="transparent"
      />
      {isEmpty ? (
        <>
          <Space size={32} />
          <EmptyList
            iconName="cursor-pointer"
            message={I18n.t('correctionOrigin.messageIOS')}
            paddingTop={0}
          />
          <Space size={32} />
        </>
      ) : null}
    </>
  );
};

export default OriginIOS;
