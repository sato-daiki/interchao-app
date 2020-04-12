import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { subTextColor, mainColor, fontSizeS } from '../../styles/Common';
import { Space } from '../atoms';
import I18n from '../../utils/I18n';

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
        <Text style={styles.emptyText}>{I18n.t('emptyMyDiaryList.text')}</Text>
      </View>
      <View style={styles.emptyLower}>
        <MaterialCommunityIcons
          name="arrow-down-bold-outline"
          size={50}
          color={mainColor}
        />
        <View style={styles.emptyHintContainer}>
          <Text style={styles.emptyHintText}>
            {I18n.t('emptyMyDiaryList.hint')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmptyMyDiaryList;
