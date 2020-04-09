import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { HeaderText } from '../components/atoms';

import { SummaryInput } from '../components/molecules';
import { primaryColor } from '../styles/Common';

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
});

const EditCorrectionSummaryScreen: ScreenType = ({ navigation }) => {
  const [summary, setSummary] = useState(''); // 新規追加時の修正文

  useEffect(() => {
    if (navigation.state.params) {
      setSummary(navigation.state.params.summary);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSubmit = useCallback(
    (text): void => {
      navigation.state.params.onPressSubmit(text);
      navigation.goBack();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    navigation.setParams({
      onPressSubmit: () => onPressSubmit(summary),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <SummaryInput
          summary={summary}
          onChangeText={(text: string): void => setSummary(text)}
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
