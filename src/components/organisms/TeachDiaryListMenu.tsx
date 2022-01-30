import React from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Platform } from 'react-native';
import { OptionItem } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
}

const TeachDiaryListMenu = ({ isMenu, nativeLanguage, onClose }: Props) => {
  return (
    <SwipeablePanel fullWidth closeOnTouchOutside isActive={isMenu} onClose={onClose}>
      {Platform.OS === 'web' ? null : (
        <OptionItem
          title={I18n.t('sns.app')}
          onPress={(): Promise<void> => appShare(nativeLanguage)}
        />
      )}
    </SwipeablePanel>
  );
};

export default TeachDiaryListMenu;
