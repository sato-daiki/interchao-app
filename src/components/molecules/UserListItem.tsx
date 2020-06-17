import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProfileIconHorizontal } from '../atoms';
import { Language, CountryCode } from '../../types';

interface Props {
  userName: string;
  photoUrl: string | null;
  nativeLanguage: Language;
  nationalityCode?: CountryCode | null;
  onPressUser?: () => void;
  onPressButton: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const UserListItem = ({
  userName,
  photoUrl,
  nativeLanguage,
  nationalityCode,
  onPressUser,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <ProfileIconHorizontal
        userName={userName}
        photoUrl={photoUrl}
        nativeLanguage={nativeLanguage}
        nationalityCode={nationalityCode}
        onPress={onPressUser}
      />
    </View>
  );
};

export default UserListItem;
