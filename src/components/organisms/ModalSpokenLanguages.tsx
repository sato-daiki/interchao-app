import React, { useState } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { Modal } from '../template';
import { Language } from '../../types';
import { getLanguage } from '../../utils/diary';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';

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

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Picker
          selectedValue={value}
          onValueChange={(selected: Language): void => setValue(selected)}
        >
          {languages.map(item => (
            <Picker.Item key={item} label={getLanguage(item)} value={item} />
          ))}
        </Picker>
        <SubmitButton title="OK" onPress={(): void => onPressSubmit(value)} />
        <Space size={16} />
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalSpokenLanguages;
