import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { fontSizeM, subTextColor, imageLightColor } from '../../styles/Common';

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    alignItems: 'center',
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
  },
  icon: {
    paddingBottom: 8,
  },
});

const EmptyDiary = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={70}
        style={styles.icon}
        color={imageLightColor}
        name="book-open-page-variant"
      />
      <Text style={styles.text}>式場の閲覧履歴はありません</Text>
    </View>
  );
};

export default EmptyDiary;
