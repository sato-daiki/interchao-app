import React, { useCallback } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Platform, StyleSheet, View } from 'react-native';
import { OptionItem, Sns } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
}

// const styles = StyleSheet.create({
//   sns: {
//     padding: 16,
//   },
// });

const TeachDiaryListMenu = ({
  isMenu,
  nativeLanguage,
  onClose,
}: Props): JSX.Element => {
  return (
    <SwipeablePanel
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
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
