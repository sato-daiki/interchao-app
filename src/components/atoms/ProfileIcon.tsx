import React from 'react';
import { Image } from 'react-native';
import { getPhotoUrl } from '../../utils/profile';
import { Language } from '../../types';
import Hoverable from './Hoverable';

interface Props {
  size?: number;
  photoUrl: string | null;
  nativeLanguage: Language;
  onPress: () => void;
}

const ProfileIcon: React.FC<Props> = ({ size = 36, photoUrl, nativeLanguage, onPress }: Props) => {
  const styleIcon = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <Hoverable onPress={onPress}>
      <Image style={styleIcon} source={getPhotoUrl(photoUrl, nativeLanguage)} />
    </Hoverable>
  );
};

export default React.memo(ProfileIcon);
