import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeS, primaryColor, borderLightColor } from '../../styles/Common';
import { Zebbu } from '../../images';

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
  iconEmpty: {
    borderColor: borderLightColor,
    borderWidth: 0.5,
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
      {photoUrl ? (
        <Image style={styles.icon} source={{ uri: photoUrl }} />
      ) : (
        <Image style={[styles.icon, styles.iconEmpty]} source={Zebbu} />
      )}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ProfileIconVertical;
