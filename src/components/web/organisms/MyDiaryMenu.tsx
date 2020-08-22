import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  onPressDeleteMenu: () => void;
}

const MyDiaryMenu = ({ onPressDeleteMenu }: Props): JSX.Element => {
  return (
    <MenuTemplate>
      <MenuOption
        onSelect={onPressDeleteMenu}
        text={I18n.t('myDiary.menuDelete')}
      />
    </MenuTemplate>
  );
};

export default MyDiaryMenu;
