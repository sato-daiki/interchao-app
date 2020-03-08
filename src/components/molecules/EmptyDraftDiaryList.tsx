import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { subTextColor, fontSizeS } from '../../styles/Common';
import { Space } from '../atoms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyUpper: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.6,
    color: subTextColor,
    textAlign: 'center',
  },
});

const EmptyDraftDiaryList: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyUpper}>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={50}
          color={subTextColor}
        />
        <Space size={8} />
        <Text style={styles.emptyText}>下書き一覧はありません</Text>
      </View>
    </View>
  );
};

export default EmptyDraftDiaryList;
