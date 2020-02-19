import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
import UserListItem from './UserListItem';

interface Props {
  name: string;
  photoUrl: string;
  introduction: string;
  onPressUser: () => void;
  onPressButton: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  introduction: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const ProfileHeader: React.FC<Props> = ({
  name,
  photoUrl,
  introduction,
  onPressUser,
  onPressButton,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <UserListItem
        name={name}
        photoUrl={photoUrl}
        onPressUser={onPressUser}
        onPressButton={onPressButton}
      />
      <Text style={styles.introduction}>{introduction}</Text>
    </View>
  );
};

export default ProfileHeader;
