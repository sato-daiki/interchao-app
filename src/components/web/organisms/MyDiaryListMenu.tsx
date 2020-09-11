import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../utils/I18n';
import { Language } from '../../../types';
import MenuTemplate from '../template/MenuTemplate';
import { CustumMenuOption } from '../molecules';

interface Props {
  nativeLanguage: Language;
}

// スマホ版もある
const MyDiaryListMenu = ({ nativeLanguage }: Props): JSX.Element => {
  const { navigate } = useNavigation();

  const onPressDraftList = useCallback(() => {
    navigate('DraftDiaryList');
  }, [navigate]);

  return (
    <MenuTemplate>
      <CustumMenuOption
        onSelect={onPressDraftList}
        icon="community"
        size={25}
        name="note-outline"
        text={I18n.t('myDiaryListMenu.draftList')}
      />
      {/* <View style={styles.sns}>
        <Sns nativeLanguage={nativeLanguage} />
      </View> */}
    </MenuTemplate>
  );
};

export default MyDiaryListMenu;
