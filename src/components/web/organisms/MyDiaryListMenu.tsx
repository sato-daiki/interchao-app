import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import { appShare } from '../../../utils/common';
import { Language } from '../../../types';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  navigation: NavigationStackProp;
  nativeLanguage: Language;
}

// スマホ版もある
const MyDiaryListMenu = ({
  navigation,
  nativeLanguage,
}: Props): JSX.Element => {
  const onPressDraftList = useCallback(() => {
    navigation.navigate('DraftDiaryList');
  }, [navigation]);

  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <MenuTemplate>
      <MenuOption
        onSelect={onPressDraftList}
        text={I18n.t('myDiaryListMenu.draftList')}
      />
      <MenuOption onSelect={onPressAppShare} text={I18n.t('sns.app')} />
    </MenuTemplate>
  );
};

export default MyDiaryListMenu;
