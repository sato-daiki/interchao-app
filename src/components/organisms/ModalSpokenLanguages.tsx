import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { Modal } from '../template';
import { Language } from '../../types';
import { getLanguage } from '../../utils/diary';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';
import { fontSizeL, fontSizeM, maxPartL } from '../../styles/Common';
import { getEachOS } from '../../utils/common';

export interface Props {
  visible: boolean;
  languages: Language[];
  defaultLanguage?: Language;
  onPressSubmit: (value: Language) => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  picker: {
    maxWidth: maxPartL,
    width: '100%',
    height: getEachOS({ ios: undefined, android: 30, web: 40 }),
    fontSize: Platform.OS === 'web' ? fontSizeL : fontSizeM,
  },
});

const ModalSpokenLanguages: React.FC<Props> = ({
  visible,
  languages,
  defaultLanguage,
  onPressSubmit,
  onPressClose,
}) => {
  const [value, setValue] = useState<Language>(defaultLanguage || languages[0]);

  const onValueChange = useCallback((itemValue: React.ReactText) => {
    setValue(itemValue as Language);
  }, []);

  const onPress = useCallback(() => {
    onPressSubmit(value || languages[0]);
  }, [languages, onPressSubmit, value]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onValueChange}
        >
          {languages.map(item => (
            <Picker.Item key={item} label={getLanguage(item)} value={item} />
          ))}
        </Picker>
        {Platform.OS === 'ios' ? null : <Space size={32} />}
        <SubmitButton title="OK" onPress={onPress} />
        <Space size={16} />
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default React.memo(ModalSpokenLanguages);
