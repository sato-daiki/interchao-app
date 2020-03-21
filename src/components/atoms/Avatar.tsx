import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { imageLightColor, subTextColor } from '../../styles/Common';

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarContainer: {
    backgroundColor: imageLightColor,
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyAvatarIcon: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
});

interface Props {
  photoUrl?: string;
  pickImage: () => void;
}

const Avatar = ({ photoUrl = '', pickImage }: Props): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={pickImage}>
    {photoUrl ? (
      <Image style={styles.icon} source={{ uri: photoUrl }} />
    ) : (
      <View style={styles.avatarContainer}>
        <MaterialIcons
          name="person"
          size={80}
          style={styles.dummyAvatarIcon}
          onPress={pickImage}
          color={subTextColor}
        />
      </View>
    )}
  </TouchableOpacity>
);

export default Avatar;
