import React, { useCallback } from 'react';
import SwipeablePanel from 'rn-swipeable-panel';
import { OptionItem } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
}

const TeachDiaryListMenu = ({
  isMenu,
  nativeLanguage,
  onClose,
}: Props): JSX.Element => {
  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <SwipeablePanel
      openLarge
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
      <OptionItem title={I18n.t('sns.share')} onPress={onPressAppShare} />
    </SwipeablePanel>
  );
};

export default TeachDiaryListMenu;
