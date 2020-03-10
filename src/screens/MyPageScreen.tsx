import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile } from '../types';
import { ProfileIconHorizontal, SmallButtonWhite } from '../components/atoms';

export interface Props {
  profile: Profile;
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  name: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  introduction: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

/**
 * マイページ
 */
const MyPageScreen: ScreenType = ({ navigation, profile }) => {
  const { userName, name, photoUrl, introduction } = profile;

  useEffect(() => {
    navigation.setParams({
      onPressSetting: () => navigation.navigate('Setting'),
    });
  }, []);

  const onPressEdit = useCallback(() => {
    navigation.navigate('EditMyProfile');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
        <SmallButtonWhite title="編集する" onPress={onPressEdit} />
      </View>
      {name ? <Text style={styles.name}>{name}</Text> : null}
      <Text style={styles.introduction}>{introduction}</Text>
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
