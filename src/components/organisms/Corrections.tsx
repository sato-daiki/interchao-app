import React, { ReactNode } from 'react';
import { Correction } from '../../types';
import { GrayHeader } from '../atoms';
import I18n from '../../utils/I18n';
import TeachDiaryCorrection from './TeachDiaryCorrection';

interface Props {
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
}

const Corrections: React.FC<Props> = ({
  correction,
  correction2,
  correction3,
}) => {
  const renderDiaryCorrection = (prmCorrection: Correction): ReactNode => {
    return <TeachDiaryCorrection correction={prmCorrection} />;
  };
  return (
    <>
      {correction ? (
        <GrayHeader title={I18n.t('teachDiaryCorrection.header')} />
      ) : null}
      {correction ? renderDiaryCorrection(correction) : null}
      {correction2 ? renderDiaryCorrection(correction2) : null}
      {correction3 ? renderDiaryCorrection(correction3) : null}
    </>
  );
};

export default Corrections;
