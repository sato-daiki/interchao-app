import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';

interface Props {
  isBorrderTop?: boolean;
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
    borderTopColor: borderLightColor,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const OptionItem = ({
  isBorrderTop = false,
  title,
  onPress,
}: Props): JSX.Element => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;
  return (
    <TouchableOpacity
      style={[styles.container, { borderTopWidth }]}
      onPress={onPress}
    >
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
