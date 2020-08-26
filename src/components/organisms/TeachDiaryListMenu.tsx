import React, { useCallback } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Platform, StyleSheet, View } from 'react-native';
import { OptionItem, Sns } from '../molecules';
import I18n from '../../utils/I18n';
import { appShare } from '../../utils/common';
import { Language } from '../../types';

interface Props {
  isMenu: boolean;
  nativeLanguage: Language;
  onClose: () => void;
}

const styles = StyleSheet.create({
  sns: {
    padding: 16,
  },
});

const TeachDiaryListMenu = ({
  isMenu,
  nativeLanguage,
  onClose,
}: Props): JSX.Element => {
  const onPressAppShare = useCallback(() => {
    appShare(nativeLanguage);
  }, [nativeLanguage]);

  return (
    <SwipeablePanel
      fullWidth
      closeOnTouchOutside
      isActive={isMenu}
      onClose={onClose}
      onPressCloseButton={onClose}
    >
      {Platform.OS === 'web' ? (
        <View style={styles.sns}>
          <Sns nativeLanguage={nativeLanguage} />
        </View>
      ) : (
        <OptionItem title={I18n.t('sns.app')} onPress={onPressAppShare} />
      )}
    </SwipeablePanel>
  );
};

export default TeachDiaryListMenu;
