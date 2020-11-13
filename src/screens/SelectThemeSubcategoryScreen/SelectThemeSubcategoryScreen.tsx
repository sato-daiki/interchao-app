import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { SelectThemeSubcategoryListItem } from '@/components/molecules';

import {
  ModalSelectPostTypeStackNavigationProp,
  ModalSelectPostTypeStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { ThemeSubcategoryInfo } from './interface';
import { first } from './config/first';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    ModalSelectPostTypeStackParamList,
    'SelectThemeSubcategory'
  >,
  ModalSelectPostTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props;
const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const keyExtractor = (item: ThemeSubcategoryInfo, index: number): string =>
  String(index);

const SelectThemeSubcategoryScreen: React.FC<ScreenType> = ({
  navigation,
  user,
}) => {
  const onPressItem = useCallback(
    (item: ThemeSubcategoryInfo) => {
      navigation.navigate('ModalThemeGuide', {
        screen: 'ThemeGuide',
        params: {
          themeSubcategoryInfo: item,
          caller: 'SelectThemeSubcategory',
        },
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<ThemeSubcategoryInfo> = useCallback(
    ({ item }) => {
      // themeSubcategoryとthemeCategoryで一意になるからfindでOK
      const newThemeDiary = user.themeDiaries?.find(
        themeDiary =>
          themeDiary.themeCategory === item.themeCategory &&
          themeDiary.themeSubcategory === item.themeSubcategory
      );
      return (
        <SelectThemeSubcategoryListItem
          key={item.themeSubcategory}
          themeDiary={newThemeDiary}
          item={item}
          source={item.source}
          title={item.title}
          text={item.text}
          onPress={onPressItem}
        />
      );
    },
    [onPressItem, user.themeDiaries]
  );

  return (
    <View style={styles.contaner}>
      <FlatList
        data={first}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SelectThemeSubcategoryScreen;
