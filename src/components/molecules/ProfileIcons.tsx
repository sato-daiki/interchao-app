import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileIcon } from '../atoms';
import { DisplaCorrection } from '../../types';

interface Props {
  correction: DisplaCorrection | null;
  correction2?: DisplaCorrection | null;
  correction3?: DisplaCorrection | null;
  onPressUser: (uid: string, userName: string) => void;
}

const styles = StyleSheet.create({
  doubleContainer: {
    width: 48,
    height: 48,
  },
  center: {
    alignSelf: 'center',
  },
  right: {
    alignSelf: 'flex-end',
  },
});

const ProfileIcons: React.FC<Props> = ({
  correction,
  correction2,
  correction3,
  onPressUser,
}: Props): JSX.Element | null => {
  const onPressUser1 = useCallback(() => {
    if (correction) {
      onPressUser(correction.profile.uid, correction.profile.userName);
    }
  }, [correction, onPressUser]);

  const onPressUser2 = useCallback(() => {
    if (correction2) {
      onPressUser(correction2.profile.uid, correction2.profile.userName);
    }
  }, [correction2, onPressUser]);

  const onPressUser3 = useCallback(() => {
    if (correction3) {
      onPressUser(correction3.profile.uid, correction3.profile.userName);
    }
  }, [correction3, onPressUser]);

  // 1個
  if (!!correction && !correction2 && !correction3) {
    return (
      <ProfileIcon
        photoUrl={correction.profile.photoUrl}
        nativeLanguage={correction.profile.nativeLanguage}
        onPress={onPressUser1}
      />
    );
  }

  // 2個
  if (!!correction && !!correction2 && !correction3) {
    return (
      <View style={styles.doubleContainer}>
        <View style={styles.right}>
          <ProfileIcon
            size={24}
            photoUrl={correction.profile.photoUrl}
            nativeLanguage={correction.profile.nativeLanguage}
            onPress={onPressUser1}
          />
        </View>
        <ProfileIcon
          size={24}
          photoUrl={correction2.profile.photoUrl}
          nativeLanguage={correction2.profile.nativeLanguage}
          onPress={onPressUser2}
        />
      </View>
    );
  }
  if (!!correction && !!correction2 && !!correction3) {
    // 3個
    return (
      <View style={styles.doubleContainer}>
        <View style={styles.right}>
          <ProfileIcon
            size={18}
            photoUrl={correction.profile.photoUrl}
            nativeLanguage={correction.profile.nativeLanguage}
            onPress={onPressUser1}
          />
        </View>
        <View style={styles.center}>
          <ProfileIcon
            size={18}
            photoUrl={correction2.profile.photoUrl}
            nativeLanguage={correction2.profile.nativeLanguage}
            onPress={onPressUser2}
          />
        </View>
        <ProfileIcon
          size={18}
          photoUrl={correction3.profile.photoUrl}
          nativeLanguage={correction3.profile.nativeLanguage}
          onPress={onPressUser3}
        />
      </View>
    );
  }
  return null;
};

export default ProfileIcons;
