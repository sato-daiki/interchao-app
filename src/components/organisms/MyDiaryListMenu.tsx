import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationStackProp } from 'react-navigation-stack';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';
import { OptionItem } from '../molecules';

interface Props {
  isMenu: boolean;
  onClose: () => void;
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({});

const MyDiaryListMenu = ({
  isMenu,
  onClose,
  navigation,
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
      <OptionItem title="プレミアム会員" onPress={onPressModalPremium} />
    </SwipeablePanel>
  );
};

export default MyDiaryListMenu;
