import React, { ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Correction, Language } from '../../types';
import { GrayHeader } from '../atoms';
import TeachDiaryCorrection from './TeachDiaryCorrection';

interface Props {
  isLoading: boolean;
  headerTitle: string;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
  nativeLanguage: Language;
  textLanguage: Language;
  onPressUser?: (uid: string, userName: string) => void;
}
const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: 16,
  },
});
const Corrections: React.FC<Props> = ({
  isLoading,
  headerTitle,
  correction,
  correction2,
  correction3,
  nativeLanguage,
  textLanguage,
  onPressUser,
}) => {
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  const renderDiaryCorrection = (prmCorrection: Correction): ReactNode => {
    return (
      <TeachDiaryCorrection
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
        correction={prmCorrection}
        onPressUser={onPressUser}
      />
    );
  };
  return (
    <>
      {correction ? <GrayHeader title={headerTitle} /> : null}
      {correction ? renderDiaryCorrection(correction) : null}
      {correction2 ? renderDiaryCorrection(correction2) : null}
      {correction3 ? renderDiaryCorrection(correction3) : null}
    </>
  );
};

export default Corrections;
