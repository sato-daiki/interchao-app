import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';
import { Checkbox } from '../atoms';

interface Props {
  checked: boolean;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    paddingLeft: 16,
    paddingRight: 14,
    borderBottomColor: borderLightColor,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const CheckItem = ({ title, checked, onPress }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Checkbox checked={checked} onPress={onPress} />
    </View>
  );
};

export default CheckItem;
