import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { primaryColor, softRed } from '../../styles/Common';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  isDiff: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

const CorrectingRightIcon: React.FC<Props> = ({ isDiff, onPress }) => {
  if (isDiff) {
    return (
      <TouchableOpacity style={styles.icon} onPress={onPress}>
        <MaterialCommunityIcons size={28} color={primaryColor} name="pen" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <MaterialCommunityIcons size={22} color={softRed} name="close" />
    </TouchableOpacity>
  );
};

export default CorrectingRightIcon;
