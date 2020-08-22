import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { MenuOption } from 'react-native-popup-menu';
import I18n from '../../../utils/I18n';
import { appShare } from '../../../utils/common';
import { Language } from '../../../types';
import MenuTemplate from '../template/MenuTemplate';

interface Props {
  uid: string;
  navigation: NavigationStackProp;
  nativeLanguage: Language;
}

// スマホ版もある
const MyDiaryListMenu = ({
  navigation,
  uid,
  nativeLanguage,
}: Props): JSX.Element => {
  const onPressMyPage = useCallback(() => {
    navigation.navigate('MyPage');
  }, [navigation]);

  const onPressDraftList = useCallback(() => {
    navigation.navigate('DraftDiaryList');
  }, [navigation]);

  const onPressReviewList = useCallback(() => {
    navigation.navigate('ReviewList', { uid });
  }, [navigation, uid]);

  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <MenuTemplate>
      <MenuOption
        onSelect={onPressMyPage}
        text={I18n.t('myDiaryListMenu.myPage')}
      />
      <MenuOption
        onSelect={onPressDraftList}
        text={I18n.t('myDiaryListMenu.draftList')}
      />
      <MenuOption
        onSelect={onPressReviewList}
        text={I18n.t('myDiaryListMenu.reviewList')}
      />
      <MenuOption onSelect={onPressAppShare} text={I18n.t('sns.app')} />
    </MenuTemplate>
  );
};

export default MyDiaryListMenu;
