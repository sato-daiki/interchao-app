import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { getPhotoUrl } from '../../utils/profile';
import { Language } from '../../types';

interface Props {
  size?: number;
  photoUrl: string;
  nativeLanguage: Language;
  onPress: () => void;
}

const ProfileIcon: React.FC<Props> = ({
  size = 36,
  photoUrl,
  nativeLanguage,
  onPress,
}: Props): JSX.Element => {
  const styleIcon = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styleIcon} source={getPhotoUrl(photoUrl, nativeLanguage)} />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
