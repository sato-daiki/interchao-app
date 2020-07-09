import React, { ReactNode } from 'react';
import { Correction } from '../../types';
import { GrayHeader } from '../atoms';
import TeachDiaryCorrection from './TeachDiaryCorrection';

interface Props {
  headerTitle: string;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
  hidden1: boolean;
  hidden2: boolean;
  hidden3?: boolean;
  onPressUser?: (uid: string) => void;
  onPressHidden: (prmCorrectedNum: number) => void;
}

const Corrections: React.FC<Props> = ({
  headerTitle,
  correction,
  correction2,
  correction3,
  hidden1,
  hidden2,
  hidden3,
  onPressUser,
  onPressHidden,
}) => {
  const renderDiaryCorrection = (
    prmCorrection: Correction,
    prmHidden: boolean,
    correctedNum: number
  ): ReactNode => {
    return (
      <TeachDiaryCorrection
        hidden={prmHidden}
        correction={prmCorrection}
        onPressUser={onPressUser}
        onPressHidden={(): void => onPressHidden(correctedNum)}
      />
    );
  };
  return (
    <>
      {correction ? <GrayHeader title={headerTitle} /> : null}
      {correction ? renderDiaryCorrection(correction, hidden1, 1) : null}
      {correction2 ? renderDiaryCorrection(correction2, hidden2, 2) : null}
      {correction3 && hidden3 !== undefined
        ? renderDiaryCorrection(correction3, hidden3, 3)
        : null}
    </>
  );
};

export default Corrections;
