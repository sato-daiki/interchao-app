import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeL, fontSizeM, mainColor } from '../../styles/Common';

interface Props {
  title: string;
  color: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: mainColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const HeaderButton: React.FC<Props> = ({ title, color, onPress }: Props) => {
  if (!title) return null;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
