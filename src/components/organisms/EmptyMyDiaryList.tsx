import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
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
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.6,
    color: subTextColor,
    textAlign: 'center',
  },
  emptyLower: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 6,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 44, // 中央に寄せるため
  },
  emptyHintContainer: {
    paddingLeft: 8,
  },
  emptyHintText: {
    textAlign: 'left',
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
      {Platform.OS === 'web' ? null : (
        <View style={styles.emptyLower}>
          <View style={styles.left} />
          <View style={styles.right}>
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
      )}
    </View>
  );
};

export default EmptyMyDiaryList;
