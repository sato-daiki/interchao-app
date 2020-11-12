import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  ModalSelectPostTypeStackNavigationProp,
  ModalSelectPostTypeStackParamList,
} from '@/navigations/ModalNavigator';
import { ImageListItem } from '@/components/molecules';
import { SubcatergoryInfo } from './interface';
import { first } from './config/first';

export interface Props {
  // profile: Profile;
}

interface DispatchProps {
  // setProfile: (profile: Profile) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalSelectPostTypeStackParamList, 'SelectSubcategory'>,
  ModalSelectPostTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const keyExtractor = (item: SubcatergoryInfo, index: number): string =>
  String(index);

const SelectSubcategoryScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressItem = useCallback(
    (item: SubcatergoryInfo) => {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: {
          subcatergoryInfo: item,
        },
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<SubcatergoryInfo> = useCallback(
    ({ item, index }): JSX.Element => {
      return (
        <ImageListItem
          key={item.key}
          item={item}
          source={item.source}
          title={item.title}
          text={item.text}
          onPress={onPressItem}
        />
      );
    },
    [onPressItem]
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

export default SelectSubcategoryScreen;
