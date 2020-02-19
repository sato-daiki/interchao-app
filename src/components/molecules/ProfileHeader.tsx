import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProfileIconHorizontal, SmallButton } from '../atoms';
import { primaryColor, fontSizeM } from '../../styles/Common';

interface Props {
  name: string;
  photoUrl: string;
  introduction: string;
  buttonTitle: string;
  onPressUser: () => void;
  onPressButton: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
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
  buttonTitle,
  onPressUser,
  onPressButton,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileIconHorizontal
          name={name}
          photoUrl={photoUrl}
          onPress={onPressUser}
        />
        <SmallButton
          isLoading={false}
          disable={false}
          title={buttonTitle}
          onPress={onPressButton}
        />
      </View>
      <Text style={styles.introduction}>{introduction}</Text>
    </View>
  );
};

export default ProfileHeader;
