import React from 'react';
import { View, StyleSheet } from 'react-native';
import { offWhite } from '@/styles/Common';
import { TextButtun } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { ThemeCategory, ThemeSubcategory } from '@/types';

interface Props {
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  onPressThemeGuide: () => void;
  onPressDraft: () => void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const Footer: React.FC<Props> = ({
  themeCategory,
  themeSubcategory,
  onPressThemeGuide,
  onPressDraft,
}) => {
  return (
    <View style={styles.container}>
      {!themeCategory || !themeSubcategory ? null : (
        <TextButtun
          isBorrderTop
          title={I18n.t('postDiaryComponent.hint')}
          onPress={onPressThemeGuide}
        />
      )}
      <TextButtun
        isBorrderTop
        isBorrderBottom
        title={I18n.t('postDiaryComponent.draft')}
        onPress={onPressDraft}
      />
    </View>
  );
};

export default React.memo(Footer);
