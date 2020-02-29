import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  offWhite,
  subTextColor,
  fontSizeS,
  borderLightColor,
  primaryColor,
  fontSizeM,
  linkBlue,
} from '../styles/Common';
import { OptionItem } from '../components/molecules';
import { Space } from '../components/atoms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
  title: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingLeft: 16,
    paddingBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    borderBottomColor: borderLightColor,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingLeft: 16,
  },
  status: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingRight: 16,
  },
  quit: {
    paddingTop: 16,
    color: linkBlue,
    textAlign: 'center',
    fontSize: fontSizeM,
  },
});

/**
 * プレミアムサービス画面
 */
const PremiumScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPressModalPremium = useCallback(() => {
    navigation.navigate('ModalPremium');
  }, [navigation]);
  const pro = true;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>プレミアムサービス</Text>
      <OptionItem
        title="プレミアムサービスについて"
        onPress={onPressModalPremium}
      />
      <Space size={16} />
      <Text style={styles.title}>購買状況</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.label}>ステータス</Text>
        <Text style={styles.status}>未登録：無料プラン</Text>
      </View>
      {pro ? <Text style={styles.quit}>プレミアム会員を辞める</Text> : null}
    </View>
  );
};

export default PremiumScreen;
