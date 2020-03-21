import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { HeaderText } from '../components/atoms';
import CommentInput from '../components/molecules/CommentInput';
import { mainColor } from '../styles/Common';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
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
});

/**
 * 添削中
 */
const EditCorrectionCommentScreen: ScreenType = ({ navigation }) => {
  const { item } = navigation.state.params!;
  const [fix, setFix] = useState(item.fix); // 新規追加時の修正文
  const [detail, setDetail] = useState(item.detail); // 新規追加時のコメント

  useEffect(() => {
    const { onPressSubmit } = navigation.state.params!;
    navigation.setParams({
      onPressSubmit: () => onPressSubmit(item.id, fix, detail),
    });
  }, [fix, detail, item.id]);

  return (
    <View style={[styles.container]}>
      <CommentInput
        original={item.original}
        fix={fix}
        detail={detail}
        onChangeTextFix={(text: string): void => setFix(text)}
        onChangeTextDetail={(text: string): void => setDetail(text)}
      />
    </View>
  );
};

EditCorrectionCommentScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: 'コメントを編集する',
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

export default EditCorrectionCommentScreen;
