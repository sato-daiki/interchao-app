import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeablePanel from 'rn-swipeable-panel';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  green,
} from '../../styles/Common';
import { OptionItem } from '../molecules';

interface Props {
  isReport: boolean;
  closePanel: () => void;
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: borderLightColor,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primaryColor,
  },
  subTitle: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    color: primaryColor,
  },
  description: {
    fontSize: fontSizeM,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
  headerReported: {
    paddingTop: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
});

const Report = ({ isReport, closePanel }: Props): JSX.Element => {
  const [reported, setReported] = useState(false);

  const onPressSpam = useCallback(() => {
    setReported(true);
  }, []);

  const onPressInappropriate = useCallback(() => {
    setReported(true);
  }, []);

  const reportMenu = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>報告</Text>
      </View>
      <Text style={styles.subTitle}>このアカウントを報告する理由</Text>
      <Text style={styles.description}>
        どのアクションを実行しても、相手に通知されることはありません。差し迫った危険に直面する人がいた場合は、今すぐ地域の警察または消防機関に緊急通報してください。
      </Text>
      <OptionItem isBorrderTop title="スパムである" onPress={onPressSpam} />
      <OptionItem title="不適切である" onPress={onPressInappropriate} />
    </>
  );

  const reportedText = (
    <>
      <View style={styles.headerReported}>
        <MaterialCommunityIcons size={70} color={green} name="check" />
        <Text style={styles.title}>ご報告ありがとうございます</Text>
      </View>
      <Text style={styles.description}>
        いただいた情報はホワイトジブラをより安全なものにするために役立たせていただきます。
      </Text>
    </>
  );

  return (
    <SwipeablePanel
      openLarge
      fullWidth
      closeOnTouchOutside
      isActive={isReport}
      onClose={closePanel}
      onPressCloseButton={closePanel}
    >
      {!reported ? reportMenu : reportedText}
    </SwipeablePanel>
  );
};

export default Report;
