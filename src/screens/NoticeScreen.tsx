import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { offWhite } from '../styles/Common';
import { CheckItem } from '../components/molecules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
});

/**
 * 通知画面
 */
const NoticeScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CheckItem checked title="マイ日記の添削が完了" onPress={() => {}} />
      <CheckItem title="添削した日記レビューが完了" onPress={() => {}} />
      <CheckItem checked title="運営からのお知らせ" onPress={() => {}} />
    </View>
  );
};

export default NoticeScreen;
