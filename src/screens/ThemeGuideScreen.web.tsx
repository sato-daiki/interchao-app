import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  TextStyle,
} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import I18n from '@/utils/I18n';
import {
  ModalThemeGuideStackNavigationProp,
  ModalThemeGuideStackParamList,
} from '@/navigations/ModalNavigator';
import Header from '@/components/organisms/ThemeGuide/Header';
import {
  getEntries,
  IntroductionParams,
  StyleType,
  TipParams,
  WordParams,
} from '@/components/organisms/ThemeGuide';
import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';
import { Write } from '@/images';
import { SubmitButton } from '@/components/atoms';

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
  section: {
    marginBottom: 32,
  },
  imageIntroductionParams: {
    marginTop: 16,
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginBottom: 32,
  },
  imageEnd: {
    width: 80,
    height: 80,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const { width } = Dimensions.get('window');

const getStyle = (styleType: StyleType): TextStyle | undefined => {
  switch (styleType) {
    case 'bold':
      return styles.bold;
    case 'p':
      return undefined;
    default:
      return undefined;
  }
};

const ThemeGuideScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const { themeCategory, themeSubcategory, caller } = route.params;
  const entries = getEntries(themeSubcategory) || [];

  const introductionParams = entries[0].params as IntroductionParams;
  const tipParams = entries[1].params as TipParams;
  const wordParams = entries[2].params as WordParams;

  const onPressEnd = useCallback(() => {
    if (caller === 'SelectThemeSubcategory') {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: { themeCategory, themeSubcategory },
      });
    } else {
      navigation.goBack();
    }
  }, [caller, navigation, themeCategory, themeSubcategory]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.themeSubcategory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title={I18n.t('themeGuide.introduction')} />
      <Image
        source={introductionParams.source}
        style={styles.imageIntroductionParams}
      />
      <Text style={styles.text}>{introductionParams.text}</Text>

      <Header title={I18n.t('themeGuide.guideTipTitle')} />
      <View style={styles.section}>
        <Text style={styles.title}>
          {`⭐️ ${I18n.t('themeGuide.expression')}`}
        </Text>
        {tipParams.expressions.map(expression => (
          <Text key={expression.id} style={styles.text}>
            {`・${expression.learnText}`}
            <Text style={styles.subTextAndMarginLeft}>
              {`（${expression.nativeText}）`}
            </Text>
          </Text>
        ))}
      </View>

      <Text style={styles.title}>{`✍️ ${I18n.t('themeGuide.example')}`}</Text>
      {tipParams.examples.map(example => (
        <View key={example.id} style={styles.example}>
          <Text style={styles.text}>
            ・
            {example.learnText.map(t => (
              <Text key={t.id} style={[getStyle(t.styleType)]}>
                {`${t.text} `}
              </Text>
            ))}
          </Text>
          <Text style={styles.subText}>{`（${example.nativeText}）`}</Text>
        </View>
      ))}

      <Header title={I18n.t('themeGuide.word')} />
      <Text style={styles.title}>{`📖 ${wordParams.title}`}</Text>
      {wordParams.words.map(word => (
        <Text key={word.id} style={styles.text}>
          {`・${word.learnText}`}
          <Text style={styles.subTextAndMarginLeft}>
            {` - ${word.nativeText}`}
          </Text>
        </Text>
      ))}

      <Text style={styles.text}>{I18n.t('themeGuide.guideEndText')}</Text>
      <Image source={Write} style={styles.imageEnd} />
      <SubmitButton title={I18n.t('common.begin')} onPress={onPressEnd} />
    </ScrollView>
  );
};

export default ThemeGuideScreen;
