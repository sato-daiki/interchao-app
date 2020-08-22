import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  isBlocked: boolean;
  onPressReport: () => void;
  onPressBlock: () => void;
}

// スマホ版もある
const UserProfileMenu = ({
  isBlocked,
  onPressReport,
  onPressBlock,
}: Props): JSX.Element => {
  return (
    <MenuTemplate>
      <MenuOption
        onSelect={onPressBlock}
        text={
          isBlocked
            ? I18n.t('userProfile.unBlocked')
            : I18n.t('userProfile.blocked')
        }
      />
      <MenuOption
        onSelect={onPressReport}
        text={I18n.t('userProfile.report')}
      />
    </MenuTemplate>
  );
};

export default UserProfileMenu;
