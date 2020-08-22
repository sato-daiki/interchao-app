import React, { useCallback } from 'react';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import { Language } from '../../../types';
import { appShare } from '../../../utils/common';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  nativeLanguage: Language;
}

// スマホ版もある
const TeachDiaryListMenu = ({ nativeLanguage }: Props): JSX.Element => {
  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <MenuTemplate>
      <MenuOption onSelect={onPressAppShare} text={I18n.t('sns.app')} />
    </MenuTemplate>
  );
};

export default TeachDiaryListMenu;
