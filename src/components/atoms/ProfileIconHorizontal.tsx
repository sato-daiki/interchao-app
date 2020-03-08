import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeS, primaryColor, borderLightColor } from '../../styles/Common';
import { Zebbu } from '../../images';

interface Props {
  userName: string;
  photoUrl: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 4,
  },
  iconEmpty: {
    borderColor: borderLightColor,
    borderWidth: 0.5,
  },
  userName: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const ProfileIconHorizontal: React.FC<Props> = ({
  userName,
  photoUrl,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress || undefined}>
      {photoUrl ? (
        <Image style={styles.icon} source={{ uri: photoUrl }} />
      ) : (
        <Image style={[styles.icon, styles.iconEmpty]} source={Zebbu} />
      )}
      <Text style={styles.userName}>{userName}</Text>
    </TouchableOpacity>
  );
};

export default ProfileIconHorizontal;
