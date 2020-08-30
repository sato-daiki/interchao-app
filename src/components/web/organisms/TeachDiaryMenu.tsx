import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  onPressAppShare: () => void;
}

const TeachDiaryMenu = ({ onPressAppShare }: Props): JSX.Element => {
  return (
    <MenuTemplate>
      <MenuOption onSelect={onPressAppShare} text={I18n.t('sns.diary')} />
    </MenuTemplate>
  );
};

export default TeachDiaryMenu;
