import React from 'react';
import { View, StyleSheet } from 'react-native';
// import OnOffSmallButton from './OnOffSmallButton';
import { ProfileIconHorizontal } from '../atoms';
import { Language } from '../../types';

interface Props {
  userName: string;
  photoUrl: string | null;
  nativeLanguage: Language;
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
  onPressUser,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <ProfileIconHorizontal
        userName={userName}
        photoUrl={photoUrl}
        nativeLanguage={nativeLanguage}
        onPress={onPressUser}
      />
      {/* <OnOffSmallButton
        isOn={false}
        isLoading={false}
        disable={false}
        titleOn="お気に入り済み"
        titleOff="お気に入りに追加"
        onPress={onPressButton}
      /> */}
    </View>
  );
};

export default UserListItem;
