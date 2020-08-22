import React, { useCallback } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { NavigationStackProp } from 'react-navigation-stack';
import { OptionItem } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
  navigation: NavigationStackProp;
}

// web版もある
const MyDiaryListMenu = ({
  navigation,
  isMenu,
  nativeLanguage,
  onClose,
}: Props): JSX.Element => {
  const onPressDraftList = useCallback(() => {
    navigation.navigate('DraftDiaryList');
    onClose();
  }, [navigation, onClose]);

  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

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
      <OptionItem title={I18n.t('sns.app')} onPress={onPressAppShare} />
    </SwipeablePanel>
  );
};

export default MyDiaryListMenu;
