import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeS, primaryColor } from '../../styles/Common';
import { getPhotoUrl } from '../../utils/profile';
import { Language } from '../../types';

interface Props {
  userName: string;
  photoUrl: string;
  nativeLanguage: Language;
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
  userName: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const ProfileIconHorizontal: React.FC<Props> = ({
  userName,
  photoUrl,
  nativeLanguage,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress || undefined}
      activeOpacity={onPress ? 0.2 : 1}
    >
      <Image
        style={styles.icon}
        source={getPhotoUrl(photoUrl, nativeLanguage)}
      />

      <Text style={styles.userName}>{userName}</Text>
    </TouchableOpacity>
  );
};

export default ProfileIconHorizontal;
