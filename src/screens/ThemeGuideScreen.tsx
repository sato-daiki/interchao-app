import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ThemeGuideIntroduction,
  ThemeGuideTip,
  getEntries,
  Entry,
  ThemeGuideEnd,
} from '@/components/organisms/ThemeGuide';
import {
  ModalThemeGuideStackNavigationProp,
  ModalThemeGuideStackParamList,
} from '@/navigations/ModalNavigator';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import ThemeGuideWord from '@/components/organisms/ThemeGuide/ThemeGuideWord';
import { mainColor, primaryColor } from '@/styles/Common';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalThemeGuideStackParamList, 'ThemeGuide'>,
  ModalThemeGuideStackNavigationProp
>;

type ThemeGuideRouteProp = RouteProp<
  ModalThemeGuideStackParamList,
  'ThemeGuide'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: ThemeGuideRouteProp;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const ThemeGuideScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const { themeCategory, themeSubcategory, caller } = route.params;
  const entries = getEntries(themeSubcategory) || [];
  const [activeSlide, setActiveSlide] = useState(
    caller === 'PostDiary' ? entries.length - 1 : 0
  );

  const onPressEnd = useCallback(() => {
    // SelectThemeSubcategory選択からした場合は遷移 / PostDiaryからきた場合はback
    if (caller === 'SelectThemeSubcategory') {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: { themeCategory, themeSubcategory },
      });
    } else {
      navigation.goBack();
    }
  }, [caller, navigation, themeCategory, themeSubcategory]);

  const onSnapToItem = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const renderItem: ListRenderItem<Entry> = useCallback(
    ({ item }) => {
      switch (item.key) {
        case 'introduction':
          return <ThemeGuideIntroduction params={item.params} />;
        case 'tip':
          return <ThemeGuideTip params={item.params} />;
        case 'word':
          return <ThemeGuideWord params={item.params} />;
        case 'end':
          return <ThemeGuideEnd onPressSubmit={onPressEnd} />;
        default:
          return null;
      }
    },
    [onPressEnd]
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        sliderWidth={window.width}
        itemWidth={window.width}
        // PostDiaryから呼ばれた場合は最後から
        firstItem={caller === 'PostDiary' ? entries.length - 1 : 0}
        onSnapToItem={onSnapToItem}
      />
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={entries.length}
        dotColor={mainColor}
        inactiveDotColor={primaryColor}
      />
    </View>
  );
};

export default ThemeGuideScreen;
