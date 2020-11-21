import React, { useCallback, useEffect } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  ModalThemeGuideStackNavigationProp,
  ModalThemeGuideStackParamList,
} from '@/navigations/ModalNavigator';
import ThemeGuideWeb from '@/components/organisms/ThemeGuide/ThemeGuideWeb';
import { Profile } from '@/types';

export interface Props {
  profile: Profile;
}

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
} & Props;

const ThemeGuideScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  profile,
}) => {
  const { themeTitle, themeCategory, themeSubcategory, caller } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.themeSubcategory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressBegin = useCallback(() => {
    if (caller === 'SelectThemeSubcategory') {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: { themeTitle, themeCategory, themeSubcategory },
      });
    } else {
      navigation.goBack();
    }
  }, [caller, navigation, themeTitle, themeCategory, themeSubcategory]);

  return (
    <ThemeGuideWeb
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
      themeSubcategory={themeSubcategory}
      onPressClose={onPressClose}
      onPressBegin={onPressBegin}
    />
  );
};

export default ThemeGuideScreen;
