import React, { useCallback } from 'react';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationStackProp } from 'react-navigation-stack';
import { OptionItem } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  uid: string;
  nativeLanguage: Language;
  onClose: () => void;
  navigation: NavigationStackProp;
}

const MyDiaryListMenu = ({
  navigation,
  isMenu,
  uid,
  nativeLanguage,
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

  const onPressReviewList = useCallback(() => {
    navigation.navigate('ReviewList', { uid });
    onClose();
  }, [navigation, onClose, uid]);

  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <SwipeablePanel
      openLarge
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
      <OptionItem
        title={I18n.t('myDiaryListMenu.myPage')}
        onPress={onPressMyPage}
      />
      <OptionItem
        title={I18n.t('myDiaryListMenu.draftList')}
        onPress={onPressDraftList}
      />
      <OptionItem
        title={I18n.t('myDiaryListMenu.reviewList')}
        onPress={onPressReviewList}
      />
      <OptionItem title={I18n.t('sns.share')} onPress={onPressAppShare} />
    </SwipeablePanel>
  );
};

export default MyDiaryListMenu;
