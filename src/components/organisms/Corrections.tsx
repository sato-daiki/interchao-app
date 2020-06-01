import React, { ReactNode } from 'react';
import { Correction } from '../../types';
import { GrayHeader } from '../atoms';
import TeachDiaryCorrection from './TeachDiaryCorrection';

interface Props {
  headerTitle: string;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
  onPressUser?: (uid: string) => void;
}

const Corrections: React.FC<Props> = ({
  headerTitle,
  correction,
  correction2,
  correction3,
  onPressUser,
}) => {
  const renderDiaryCorrection = (prmCorrection: Correction): ReactNode => {
    return (
      <TeachDiaryCorrection
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
