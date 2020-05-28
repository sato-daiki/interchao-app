import React, { ReactNode } from 'react';
import { Correction } from '../../types';
import { GrayHeader } from '../atoms';
import TeachDiaryCorrection from './TeachDiaryCorrection';

interface Props {
  headerTitle: string;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
}

const Corrections: React.FC<Props> = ({
  headerTitle,
  correction,
  correction2,
  correction3,
}) => {
  const renderDiaryCorrection = (prmCorrection: Correction): ReactNode => {
    return <TeachDiaryCorrection correction={prmCorrection} />;
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
