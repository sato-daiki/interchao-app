import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ListRenderItem, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
  ThemeGuideIntroduction,
  ThemeGuideTip,
  getEntries,
  Entry,
  ThemeGuideEnd,
} from '@/components/organisms/ThemeGuide';

import ThemeGuideWord from '@/components/organisms/ThemeGuide/ThemeGuideWord';
import { mainColor, primaryColor } from '@/styles/Common';
import { ScreenType } from './interfaces';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const { width } = Dimensions.get('window');

const ThemeGuideScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  profile,
}) => {
  const { themeTitle, themeCategory, themeSubcategory, caller } = route.params;
  const entries =
    getEntries({
      themeCategory,
      themeSubcategory,
      nativeLanguage: profile.nativeLanguage,
      learnLanguage: profile.learnLanguage,
    }) || [];
  const [activeSlide, setActiveSlide] = useState(
    caller === 'PostDiary' ? entries.length - 1 : 0
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.params.themeSubcategory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressEnd = useCallback(() => {
    // SelectThemeSubcategory選択からした場合は遷移 / PostDiaryからきた場合はback
    if (caller === 'SelectThemeSubcategory') {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: { themeTitle, themeCategory, themeSubcategory },
      });
    } else {
      navigation.goBack();
    }
  }, [caller, navigation, themeCategory, themeSubcategory, themeTitle]);

  const onSnapToItem = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const renderItem: ListRenderItem<Entry> = useCallback(
    ({ item }) => {
      switch (item.key) {
        case 'introduction':
          return <ThemeGuideIntroduction params={item.params} />;
        case 'tip':
          return (
            <ThemeGuideTip
              params={item.params}
              nativeLanguage={profile.nativeLanguage}
              textLanguage={profile.learnLanguage}
            />
          );
        case 'word':
          return <ThemeGuideWord params={item.params} />;
        case 'end':
          return <ThemeGuideEnd onPressSubmit={onPressEnd} />;
        default:
          return null;
      }
    },
    [onPressEnd, profile.learnLanguage, profile.nativeLanguage]
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
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
