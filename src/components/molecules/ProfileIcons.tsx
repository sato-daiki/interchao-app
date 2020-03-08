import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { borderLightColor } from '../../styles/Common';
import { Zebbu } from '../../images';
import { ProfileIcon } from '../atoms';
import { Correction } from '../../types';

interface Props {
  correction?: Correction;
  proCorrection?: Correction;
  onPressUser: (uid: string) => void;
}

const styles = StyleSheet.create({
  doubleContainer: {
    width: 48,
    height: 48,
  },
  right: {
    alignSelf: 'flex-end',
  },
});

const ProfileIcons: React.FC<Props> = ({
  correction,
  proCorrection,
  onPressUser,
}: Props): JSX.Element | null => {
  // 両方ない場合
  if (!correction && !proCorrection) {
    return null;
  }
  // 通常のみの場合
  if (!!correction && !proCorrection) {
    return (
      <ProfileIcon
        photoUrl={correction.profile.photoUrl}
        onPress={(): void => onPressUser(correction.profile.uid)}
      />
    );
  }

  // プロのみの場合
  if (!correction && !!proCorrection) {
    return (
      <ProfileIcon
        photoUrl={proCorrection.profile.photoUrl}
        onPress={(): void => onPressUser(proCorrection.profile.uid)}
      />
    );
  }
  // 二つの場合
  return (
    <View style={styles.doubleContainer}>
      <View style={styles.right}>
        <ProfileIcon
          size={24}
          photoUrl={proCorrection.profile.photoUrl}
          onPress={(): void => onPressUser(proCorrection.profile.uid)}
        />
      </View>
      <ProfileIcon
        size={24}
        photoUrl={proCorrection.profile.photoUrl}
        onPress={(): void => onPressUser(proCorrection.profile.uid)}
      />
    </View>
  );
};

export default ProfileIcons;
