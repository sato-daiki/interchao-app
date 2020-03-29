import React, { useCallback } from 'react';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationStackProp } from 'react-navigation-stack';
import { OptionItem } from '../molecules';

interface Props {
  isMenu: boolean;
  uid: string;
  onClose: () => void;
  navigation: NavigationStackProp;
}

const MyDiaryListMenu = ({
  navigation,
  isMenu,
  uid,
  onClose,
}: Props): JSX.Element => {
  const onPressMyPage = useCallback(() => {
    navigation.navigate('MyPage');
    onClose();
  }, [navigation, onClose]);

  const onPressDraftList = useCallback(() => {
    navigation.navigate('DraftDiaryList');
    onClose();
  }, [navigation, onClose]);

  const onPressModalPremium = useCallback(() => {
    navigation.navigate('ModalPremium');
    onClose();
  }, [navigation, onClose]);

  const onPressReviewList = useCallback(() => {
    navigation.navigate('ReviewList', { uid });
    onClose();
  }, [navigation, onClose]);

  return (
    <SwipeablePanel
      openLarge
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
      <OptionItem title="マイページ" onPress={onPressMyPage} />
      <OptionItem title="下書き一覧" onPress={onPressDraftList} />
      <OptionItem title="レビュー一覧" onPress={onPressReviewList} />
      <OptionItem title="プレミアム会員" onPress={onPressModalPremium} />
    </SwipeablePanel>
  );
};

export default MyDiaryListMenu;
