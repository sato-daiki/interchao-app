import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor } from '../../styles/Common';
import { Space } from '../atoms';

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    alignItems: 'center',
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
  },
});

const EmptyReview = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="star" size={36} color={subTextColor} />
      <Space size={8} />
      <Text style={styles.text}>レビューはまだありません</Text>
    </View>
  );
};

export default EmptyReview;
