import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Picker, Platform } from 'react-native';
import { Modal } from '../template';
import { Language } from '../../types';
import { getLanguage } from '../../utils/diary';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';
import { max580 } from '../../styles/Common';

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
    maxWidth: max580,
    width: '100%',
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
  useEffect(() => {
    setValue(languages[0]);
  }, [languages]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={(selected: Language): void => setValue(selected)}
        >
          {languages.map(item => (
            <Picker.Item key={item} label={getLanguage(item)} value={item} />
          ))}
        </Picker>
        {Platform.OS === 'ios' ? null : <Space size={32} />}
        <SubmitButton
          title="OK"
          onPress={(): void => onPressSubmit(value || languages[0])}
        />
        <Space size={16} />
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalSpokenLanguages;
