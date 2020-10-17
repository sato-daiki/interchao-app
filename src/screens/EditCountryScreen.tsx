import React, { useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import { Profile } from '../types';
import {
  ModalEditMyProfileStackNavigationProp,
  ModalEditMyProfileStackParamList,
} from '../navigations/ModalNavigator';

export interface Props {
  profile: Profile;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalEditMyProfileStackParamList, 'EditCountry'>,
  ModalEditMyProfileStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<ModalEditMyProfileStackParamList, 'EditCountry'>;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const EditCountryScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const onSelectNationalityCode = useCallback(
    (country: Country): void => {
      route.params.setNationalityCode(country.cca2);
      navigation.goBack();
    },
    [navigation, route.params]
  );

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={route.params.nationalityCode || 'JP'}
        withModal={false}
        withFilter
        withFlag
        withEmoji
        withAlphaFilter={Platform.OS !== 'web'}
        onSelect={onSelectNationalityCode}
        visible
      />
    </View>
  );
};

export default EditCountryScreen;
