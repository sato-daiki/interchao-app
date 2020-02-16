import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeS, primaryColor } from '../../styles/Common';

interface Props {
  name: string;
  photoUrl: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
  },
  name: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const ProfileIconVertical: React.FC<Props> = ({
  name,
  photoUrl,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.icon} source={{ uri: photoUrl }} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ProfileIconVertical;
