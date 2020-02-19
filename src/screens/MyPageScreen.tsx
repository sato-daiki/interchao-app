import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { profile } from '../utils/testdata';
import { ProfileHeader } from '../components/molecules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
});

/**
 * マイページ
 */
const MyPageScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPressUser = useCallback(() => {}, []);
  const onPressEdit = useCallback(() => {}, []);

  const { name, photoUrl, introduction } = profile;

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={name}
        photoUrl={photoUrl}
        introduction={introduction}
        onPressUser={onPressUser}
        onPressButton={onPressEdit}
        buttonTitle="編集する"
      />
    </View>
  );
};

export default MyPageScreen;
