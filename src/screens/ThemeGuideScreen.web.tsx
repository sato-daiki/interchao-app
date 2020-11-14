import React, { useCallback, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  TextStyle,
} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Heading, HoverableIcon, SubmitButton } from '@/components/atoms';
import {
  getEntries,
  IntroductionParams,
  StyleType,
  TipParams,
  WordParams,
} from '@/components/organisms/ThemeGuide';

import I18n from '@/utils/I18n';
import {
  ModalThemeGuideStackNavigationProp,
  ModalThemeGuideStackParamList,
} from '@/navigations/ModalNavigator';
import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';

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
  contentContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 64,
  },
  close: {
    position: 'absolute',
    top: 32,
    zIndex: 100,
  },
  section: {
    marginBottom: 56,
  },
  heading: {
    marginBottom: 24,
  },
  imageIntroductionParams: {
    marginTop: 16,
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginBottom: 32,
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
  textAlignCenter: {
    textAlign: 'center',
  },
  marginBottom4: {
    marginBottom: 4,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  subText: {
    color: subTextColor,
  },
  bold: {
    fontWeight: 'bold',
  },
  subTextColor: {
    color: subTextColor,
  },
});

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

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <HoverableIcon
        icon="community"
        name="close"
        size={24}
        style={styles.close}
        onPress={onPressClose}
      />
      <View style={styles.section}>
        <Heading
          title={I18n.t('themeGuide.introduction')}
          containerStyle={styles.heading}
        />
        <Image
          source={introductionParams.source}
          style={styles.imageIntroductionParams}
        />
        <Text style={[styles.text, styles.textAlignCenter]}>
          {introductionParams.text}
        </Text>
      </View>

      <View style={styles.section}>
        <Heading
          title={I18n.t('themeGuide.guideTipTitle')}
          containerStyle={styles.heading}
        />
        <Text style={styles.title}>{I18n.t('themeGuide.expression')}</Text>
        {tipParams.expressions.map(expression => (
          <Text key={expression.id} style={[styles.text, styles.marginBottom4]}>
            {`・${expression.learnText}`}
            <Text style={[styles.subTextColor, styles.marginLeft16]}>
              {`（${expression.nativeText}）`}
            </Text>
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{I18n.t('themeGuide.example')}</Text>
        {tipParams.examples.map(example => (
          <View key={example.id} style={styles.marginBottom8}>
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
      </View>

      <View style={styles.section}>
        <Heading
          title={I18n.t('themeGuide.word')}
          containerStyle={styles.heading}
        />
        <Text style={styles.title}>{`${wordParams.title}`}</Text>
        {wordParams.words.map(word => (
          <Text key={word.id} style={styles.text}>
            {`・${word.learnText}`}
            <Text style={[styles.subTextColor, styles.marginLeft16]}>
              {` - ${word.nativeText}`}
            </Text>
          </Text>
        ))}
      </View>

      <SubmitButton title={I18n.t('common.begin')} onPress={onPressEnd} />
    </ScrollView>
  );
};

export default ThemeGuideScreen;
