import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { subTextColor, mainColor, fontSizeS } from '../../styles/Common';
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
  emptyLower: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 6,
  },
  emptyHintContainer: {
    position: 'absolute',
    bottom: 16,
    alignItems: 'center',
    paddingLeft: 190,
  },
  emptyHintText: {
    fontWeight: '500',
    color: mainColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.4,
  },
});

const EmptyMyDiaryList: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyUpper}>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={50}
          color={subTextColor}
        />
        <Space size={8} />
        <Text style={styles.emptyText}>
          {
            '日記がまだ投稿されていません。\n日記を書いてネィティブに添削してもらおう！'
          }
        </Text>
      </View>
      <View style={styles.emptyLower}>
        <MaterialCommunityIcons
          name="arrow-down-bold-outline"
          size={50}
          color={mainColor}
        />
        <View style={styles.emptyHintContainer}>
          <Text style={styles.emptyHintText}>
            {'まずはここから！\n日記を無料で\n添削してもらえるよ！'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmptyMyDiaryList;
