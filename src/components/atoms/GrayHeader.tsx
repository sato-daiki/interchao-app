import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor, offWhite } from '../../styles/Common';

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: offWhite,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const GrayHeader: React.FC<Props> = ({ title }: Props): JSX.Element => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GrayHeader;
