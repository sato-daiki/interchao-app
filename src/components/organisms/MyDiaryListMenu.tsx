import React, { useCallback } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OptionItem } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
}

// web版もある
const MyDiaryListMenu = ({
  isMenu,
  nativeLanguage,
  onClose,
}: Props): JSX.Element => {
  const { navigate } = useNavigation();
  const onPressDraftList = useCallback(() => {
    navigate('DraftDiaryList');
    onClose();
  }, [navigate, onClose]);

  return (
    <SwipeablePanel
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
      <OptionItem
        title={I18n.t('myDiaryListMenu.draftList')}
        onPress={onPressDraftList}
      />
      {Platform.OS === 'web' ? null : (
        <OptionItem
          title={I18n.t('sns.app')}
          onPress={(): Promise<void> => appShare(nativeLanguage)}
        />
      )}
    </SwipeablePanel>
  );
};

export default MyDiaryListMenu;
