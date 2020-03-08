import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { borderLightColor } from '../../styles/Common';
import { Zebbu } from '../../images';

interface Props {
  size?: number;
  photoUrl: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  iconEmpty: {
    borderColor: borderLightColor,
    borderWidth: 0.5,
  },
});

const ProfileIcon: React.FC<Props> = ({
  size = 36,
  photoUrl,
  onPress,
}: Props): JSX.Element => {
  const styleIcon = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      {photoUrl ? (
        <Image style={styleIcon} source={{ uri: photoUrl }} />
      ) : (
        <Image style={[styleIcon, styles.iconEmpty]} source={Zebbu} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileIcon;
