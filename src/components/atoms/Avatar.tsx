import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar as ElAvatar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { imageLightColor, subTextColor } from '../../styles/Common';

const AVATAR_SIZE = 96;
const DUMMY_AVATAR_ICON_SIZE = 80;

const styles = StyleSheet.create({
  container: {},
  avatarContainer: {
    backgroundColor: imageLightColor,
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 96,
    height: 96,
    borderRadius: 48,
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
          style={styles.icon}
          onPress={pickImage}
          color={subTextColor}
        />
      </View>
    )}
  </TouchableOpacity>
);

export default Avatar;
