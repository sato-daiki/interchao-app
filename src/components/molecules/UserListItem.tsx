import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnOffSmallButton from './OnOffSmallButton';
import { ProfileIconHorizontal } from '../atoms';

interface Props {
  name: string;
  photoUrl: string;
  onPressUser: () => void;
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
  name,
  photoUrl,
  onPressUser,
  onPressButton,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <ProfileIconHorizontal
        name={name}
        photoUrl={photoUrl}
        onPress={onPressUser}
      />
      <OnOffSmallButton
        isOn={false}
        isLoading={false}
        disable={false}
        titleOn="お気に入り済み"
        titleOff="お気に入りに追加"
        onPress={onPressButton}
      />
    </View>
  );
};

export default UserListItem;
