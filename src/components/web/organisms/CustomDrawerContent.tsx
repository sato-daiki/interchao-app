import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import '@expo/match-media';
import { DrawerLogo, DrawerPostButton } from '../molecules';

type Props = {
  isMaxLayoutChange: boolean;
} & DrawerContentComponentProps<DrawerContentOptions>;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const CustomDrawerContent = ({
  isMaxLayoutChange,
  ...props
}: Props): JSX.Element => {
  const containerStyle = {
    alignItems: isMaxLayoutChange ? 'flex-start' : 'center',
  } as StyleProp<ViewStyle>;

  const itemStyle = {
    width: isMaxLayoutChange ? 218 : 40,
    alignItems: isMaxLayoutChange ? 'flex-start' : 'center',
  } as StyleProp<ViewStyle>;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={containerStyle}>
        <DrawerItem
          label={(): JSX.Element => (
            <DrawerLogo isMaxLayoutChange={isMaxLayoutChange} />
          )}
          onPress={(): void => props.navigation.navigate('MyDiaryTab')}
        />

        <DrawerItemList itemStyle={itemStyle} {...props} />

        <DrawerItem
          label={(): JSX.Element => (
            <DrawerPostButton
              isMaxLayoutChange={isMaxLayoutChange}
              onPress={(): void => {
                props.navigation.navigate('ModalPostDiary', {
                  screen: 'PostDiary',
                });
              }}
            />
          )}
          onPress={(): void => {
            props.navigation.navigate('ModalPostDiary', {
              screen: 'PostDiary',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
