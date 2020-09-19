import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  maxAuth,
  borderLightColor,
  maxModalScreen,
} from '../styles/Common';
import { getEachOS } from '../utils/common';
import { HeaderIcon } from '../components/atoms';

export const DefaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  // @ts-ignore
  headerTitleStyle: {
    fontWeight: getEachOS({
      ios: '700',
      android: '500',
      web: '700',
    }),
    color: primaryColor,
    fontSize: fontSizeL,
  },
  headerTintColor: primaryColor,
  headerBackTitleStyle: {
    display: 'none',
  },
  headerLeft: props => {
    const { onPress } = props;
    if (!onPress) return null;
    if (Platform.OS === 'ios') {
      return (
        <HeaderIcon
          icon="feather"
          name="chevron-left"
          size={25}
          onPress={onPress}
        />
      );
    }

    return (
      <HeaderIcon
        icon="material"
        name="arrow-back"
        size={25}
        onPress={onPress}
      />
    );
  },
  cardStyle: {
    // borderleftはdrwarのdefaultでついている
    borderRightWidth: 1,
    borderRightColor: borderLightColor,
  },
};

export const DefaultSearchBarOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleContainerStyle: {
    flex: 1,
    marginRight: 64,
  },
};

export const DefaultModalLayoutOptions: StackNavigationOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxModalScreen,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: borderLightColor,
    borderRightColor: borderLightColor,
    flex: 1,
  },
};

export const DefaultAuthLayoutOptions: StackNavigationOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxAuth,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
    flex: 1,
  },
};
