import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import ModalWeb from 'modal-enhanced-react-native-web';
import { maxAuth } from '../../../styles/Common';

interface Props {
  visible: boolean;
  nationalityCode: CountryCode | undefined;
  onClose: () => void;
  onOpen: () => void;
  onSelect: (country: Country) => void;
}

const styles = StyleSheet.create({
  warapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    maxWidth: maxAuth,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const ModalCountryPicker: React.FC<Props> = ({
  visible,
  nationalityCode,
  onClose,
  onOpen,
  onSelect,
}: Props): JSX.Element | null => {
  return (
    <View style={styles.warapper}>
      <ModalWeb visible={visible}>
        <ScrollView>
          <View style={styles.container}>
            <CountryPicker
              // @ts-ignore
              countryCode={nationalityCode}
              withFilter
              withCloseButton
              withModal={false}
              onSelect={onSelect}
              onClose={onClose}
              onOpen={onOpen}
              visible={visible}
            />
          </View>
        </ScrollView>
      </ModalWeb>
    </View>
  );
};

export default ModalCountryPicker;
