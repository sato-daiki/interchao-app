import React from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';

import { State } from '../../types/state';
import { getLanguage } from '../../utils/diary';
import I18n from '../../utils/I18n';

interface Props {
  color: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'ios' ? 2 : 0,
  },
});

const TabLabel = ({ color }: Props): JSX.Element => {
  const profile = useSelector(
    (state: State) => state.rootReducer.profile,
    shallowEqual
  );
  const nativeLanguage = getLanguage(profile.nativeLanguage);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>
        {I18n.t('mainTab.teachDiary', { nativeLanguage })}
      </Text>
    </View>
  );
};

export default TabLabel;
