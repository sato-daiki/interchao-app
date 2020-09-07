import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import ModalWeb from 'modal-enhanced-react-native-web';
import {
  maxAuth,
  fontSizeM,
  primaryColor,
  offWhite,
  borderLightColor,
} from '../../../styles/Common';

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
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 2,
    backgroundColor: offWhite,
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    width: '100%',
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
              filterProps={{ style: styles.textInput }}
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
