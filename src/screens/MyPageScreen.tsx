import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { profile } from '../utils/testdata';
import { ProfileHeader } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor } from '../styles/Common';
import { User } from '../types';

export interface Props {
  user: User;
  setUser: (user: User) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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
const MyPageScreen: ScreenType = ({ navigation }) => {
  const onPressUser = useCallback(() => {}, []);
  const onPressEdit = useCallback(() => {}, []);
  const { name, photoUrl, introduction } = profile;

  useEffect(() => {
    navigation.setParams({
      onPressSetting: () => navigation.navigate('Setting'),
    });
  }, []);

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={name}
        photoUrl={photoUrl}
        introduction={introduction}
        onPressUser={onPressUser}
        onPressButton={onPressEdit}
      />
    </View>
  );
};

MyPageScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressSetting = navigation.getParam('onPressSetting');
  return {
    ...DefaultNavigationOptions,
    title: 'マイページ',
    headerRight: (): JSX.Element => (
      <MaterialCommunityIcons
        size={28}
        color={primaryColor}
        name="settings"
        onPress={onPressSetting}
      />
    ),
  };
};

export default MyPageScreen;
