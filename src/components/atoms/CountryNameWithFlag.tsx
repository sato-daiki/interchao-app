import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getName } from 'country-list';
import Flag from 'react-native-flags';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { CountryCode } from '../../types';

interface Props {
  nationalityCode: CountryCode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationality: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const CountryNameWithFlag: React.FC<Props> = ({
  nationalityCode,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Flag code={nationalityCode} size={24} />
      <Text style={styles.nationality}>{getName(nationalityCode)}</Text>
    </View>
  );
};

export default React.memo(CountryNameWithFlag);
