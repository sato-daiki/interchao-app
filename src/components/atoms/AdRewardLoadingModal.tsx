import React from 'react';
import DarkLoadingModal from '@/components/atoms/DarkLoadingModal';

interface Props {
  visible: boolean;
}

const AdRewardLoadingModal: React.FC<Props> = ({ visible }) => (
  <DarkLoadingModal visible={visible} text="動画広告を読み込んでいます" />
);

export default React.memo(AdRewardLoadingModal);
