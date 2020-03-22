import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { HeaderText } from '../components/atoms';
import {
  mainColor,
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
} from '../styles/Common';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: primaryColor,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 16,
  },
  textInput: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 8,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
  },
});

const EditCorrectionSummaryScreen: ScreenType = ({ navigation }) => {
  const [summary, setSummary] = useState(''); // 新規追加時の修正文

  useEffect(() => {
    if (navigation.state.params) {
      setSummary(navigation.state.params.summary);
    }
  }, []);

  const onPressSubmit = useCallback((text): void => {
    navigation.state.params.onPressSubmit(text);
    navigation.goBack();
  }, []);

  useEffect(() => {
    navigation.setParams({
      onPressSubmit: () => onPressSubmit(summary),
    });
  }, [summary]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>総評</Text>
        <View style={styles.line} />
        <TextInput
          style={styles.textInput}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={summary}
          onChangeText={(text): void => setSummary(text)}
          multiline
          clearButtonMode="always"
        />
      </View>
    </View>
  );
};

EditCorrectionSummaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: 'まとめを編集する',
    headerLeft: (): JSX.Element => (
      <HeaderText
        title="閉じる"
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="完了" onPress={onPressSubmit} />
    ),
  };
};

export default EditCorrectionSummaryScreen;
