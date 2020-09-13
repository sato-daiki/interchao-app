import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';
import { CustumMenuOption } from '../molecules';

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
      <CustumMenuOption
        onSelect={onPressBlock}
        icon="material"
        size={25}
        name="block"
        text={
          isBlocked
            ? I18n.t('userProfile.unBlocked')
            : I18n.t('userProfile.blocked')
        }
      />
      <CustumMenuOption
        onSelect={onPressReport}
        icon="material"
        size={25}
        name="report"
        text={I18n.t('userProfile.report')}
      />
    </MenuTemplate>
  );
};

export default UserProfileMenu;
