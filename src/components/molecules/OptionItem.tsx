import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';

interface Props {
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
    paddingRight: 6,
    borderBottomColor: borderLightColor,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const OptionItem = ({ title, onPress }: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons
        size={28}
        color={subTextColor}
        name="chevron-right"
      />
    </TouchableOpacity>
  );
};

export default OptionItem;
