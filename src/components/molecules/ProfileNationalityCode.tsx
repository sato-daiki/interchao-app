import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getName } from 'country-list';
import Flag from 'react-native-flags';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../../styles/Common';
import { CountryCode } from '../../types';
import I18n from '../../utils/I18n';

interface Props {
  nationalityCode: CountryCode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  nationality: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const ProfileNationalityCode: React.FC<Props> = ({
  nationalityCode,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={14}
        color={subTextColor}
        name="flag-outline"
      />
      <Text style={styles.label}>
        {I18n.t('profileNationality.nationality')}
      </Text>
      <Flag code={nationalityCode} size={24} />
      <Text style={styles.nationality}>{getName(nationalityCode)}</Text>
    </View>
  );
};

export default ProfileNationalityCode;
