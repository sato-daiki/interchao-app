import React, { useCallback, useEffect } from 'react';
import ThemeGuideWeb from '@/components/organisms/ThemeGuide/ThemeGuideWeb';
import { ScreenType } from './interfaces';

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
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
      onPressClose={onPressClose}
      onPressBegin={onPressBegin}
    />
  );
};

export default ThemeGuideScreen;
