import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  green,
} from '../../styles/Common';
import { OptionItem } from '../molecules';
import { LoadingModal } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  isReport: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  onReportSubmit: (reason: string) => void;
  onReportClose: () => void;
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

const Report = ({
  isReport,
  isSuccess,
  isLoading,
  onReportSubmit,
  onReportClose,
}: Props): JSX.Element => {
  const reportMenu = (
    <>
      <LoadingModal visible={isLoading} />
      <View style={styles.header}>
        <Text style={styles.title}>{I18n.t('report.title')}</Text>
      </View>
      <Text style={styles.subTitle}>{I18n.t('report.subTitle')}</Text>
      <Text style={styles.description}>{I18n.t('report.description')}</Text>
      <OptionItem
        isBorrderTop
        title={I18n.t('report.spam')}
        onPress={(): void => onReportSubmit('spam')}
      />
      <OptionItem
        title={I18n.t('report.inappropriate')}
        onPress={(): void => onReportSubmit('inappropriate')}
      />
    </>
  );

  const reportedText = (
    <>
      <View style={styles.headerReported}>
        <MaterialCommunityIcons size={70} color={green} name="check" />
        <Text style={styles.title}>{I18n.t('report.reportedTitle')}</Text>
      </View>
      <Text style={styles.description}>
        {I18n.t('report.reportedDescription')}
      </Text>
    </>
  );

  return (
    <SwipeablePanel
      fullWidth
      closeOnTouchOutside
      isActive={isReport}
      onClose={onReportClose}
      onPressCloseButton={onReportClose}
    >
      {!isSuccess ? reportMenu : reportedText}
    </SwipeablePanel>
  );
};

export default Report;
