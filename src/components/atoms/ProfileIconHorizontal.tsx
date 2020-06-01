import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Flag from 'react-native-flags';
import { fontSizeS, primaryColor } from '../../styles/Common';
import { getPhotoUrl } from '../../utils/profile';
import { Language, CountryCode } from '../../types';

interface Props {
  userName: string;
  photoUrl: string | null;
  nativeLanguage: Language;
  nationalityCode?: CountryCode;
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
  },
  userName: {
    marginLeft: 8,
    fontSize: fontSizeS,
    color: primaryColor,
  },
  flag: {
    marginLeft: 4,
    marginTop: 3,
  },
});

const ProfileIconHorizontal: React.FC<Props> = ({
  userName,
  photoUrl,
  nativeLanguage,
  nationalityCode,
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
      {nationalityCode ? (
        <Flag style={styles.flag} code={nationalityCode} size={16} />
      ) : null}
    </TouchableOpacity>
  );
};

export default ProfileIconHorizontal;
