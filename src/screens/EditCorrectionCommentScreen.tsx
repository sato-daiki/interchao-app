import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { HeaderText } from '../components/atoms';
import { CommentInputIOS, CommentInputAndroid } from '../components/molecules';
import { mainColor } from '../styles/Common';
import I18n from '../utils/I18n';

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
    borderColor: mainColor,
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
  headerLeft: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
  },
});

/**
 * 添削中
 */
const EditCorrectionCommentScreen: ScreenType = ({ navigation }) => {
  const { item } = navigation.state.params!;
  const [original, setOriginal] = useState(item.original); // 新規追加時の原文（Anroidのみ）
  const [fix, setFix] = useState(item.fix); // 新規追加時の修正文
  const [detail, setDetail] = useState(item.detail); // 新規追加時のコメント

  const onPressSubmitIOS = useCallback(
    (prmFix: string, prmDetail: string): void => {
      if (!navigation.state.params) return;
      navigation.state.params.onPressSubmit(item.id, prmFix, prmDetail);
      navigation.goBack(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id]
  );

  const onPressSubmitAndroid = useCallback(
    (prmOriginal: string, prmFix: string, prmDetail: string): void => {
      if (!navigation.state.params) return;
      navigation.state.params.onPressSubmit(
        item.id,
        prmOriginal,
        prmFix,
        prmDetail
      );
      navigation.goBack(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id]
  );

  useEffect(() => {
    navigation.setParams({
      onPressSubmit: () => {
        if (Platform.OS === 'ios') {
          onPressSubmitIOS(fix, detail);
        } else {
          onPressSubmitAndroid(original, fix, detail);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [original, fix, detail]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {Platform.OS === 'ios' ? (
          <CommentInputIOS
            original={item.original}
            fix={fix}
            detail={detail}
            onChangeTextFix={(text: string): void => setFix(text)}
            onChangeTextDetail={(text: string): void => setDetail(text)}
          />
        ) : (
          <CommentInputAndroid
            original={original}
            fix={fix}
            detail={detail}
            onChangeTextOriginal={(text: string): void => setOriginal(text)}
            onChangeTextFix={(text: string): void => setFix(text)}
            onChangeTextDetail={(text: string): void => setDetail(text)}
          />
        )}
      </View>
    </View>
  );
};

EditCorrectionCommentScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('editCorrectionComment.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderText
        containerStyle={styles.headerLeft}
        title={I18n.t('common.close')}
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.done')} onPress={onPressSubmit} />
    ),
  };
};

export default EditCorrectionCommentScreen;
