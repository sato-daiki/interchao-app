import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '../utils/I18n';
import { primaryColor, fontSizeM, fontSizeLL } from '../styles/Common';

type ScreenType = {
  navigation: any;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 32,
  },
  title: {
    textAlign: 'center',
    fontSize: fontSizeLL,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 8,
  },
});

/**
 * 添削中
 */
const NotFoundScreen: React.FC<ScreenType> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 NOT FOUND</Text>
      <Text style={styles.text}>お探しのページは見つかりませんでした</Text>
    </View>
  );
};

export default NotFoundScreen;
