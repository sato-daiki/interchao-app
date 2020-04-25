import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';

import { State } from '../../types/state';
import { getlanguage } from '../../utils/diary';
import I18n from '../../utils/I18n';

interface Props {
  color: string;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
  },
});

const TabLabel = ({ color }: Props): JSX.Element => {
  const profile = useSelector(
    (state: State) => state.rootReducer.profile,
    shallowEqual
  );
  const nativeLanguage = getlanguage(profile.nativeLanguage);

  return (
    <Text style={[styles.text, { color }]}>
      {I18n.t('mainTab.teachDiary', { nativeLanguage })}
    </Text>
  );
};

export default TabLabel;
