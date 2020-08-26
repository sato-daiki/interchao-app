import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { MenuOption } from 'react-native-popup-menu';
import { StyleSheet, View } from 'react-native';
import I18n from '../../../utils/I18n';
import { Language } from '../../../types';
import MenuTemplate from '../template/MenuTemplate';
import { Sns } from '../../molecules';

interface Props {
  navigation: NavigationStackProp;
  nativeLanguage: Language;
}

const styles = StyleSheet.create({
  sns: {
    padding: 16,
    paddingTop: 64,
  },
});

// スマホ版もある
const MyDiaryListMenu = ({
  navigation,
  nativeLanguage,
}: Props): JSX.Element => {
  const onPressDraftList = useCallback(() => {
    navigation.navigate('DraftDiaryList');
  }, [navigation]);

  return (
    <MenuTemplate>
      <MenuOption
        onSelect={onPressDraftList}
        text={I18n.t('myDiaryListMenu.draftList')}
      />
      {/* <View style={styles.sns}>
        <Sns nativeLanguage={nativeLanguage} />
      </View> */}
    </MenuTemplate>
  );
};

export default MyDiaryListMenu;
