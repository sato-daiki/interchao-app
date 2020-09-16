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
  headerTitleStyle: {
    textAlign: getEachOS({ ios: 'center', android: 'left', web: 'left' }),
    fontWeight: getEachOS({ ios: '700', android: '500', web: '700' }),
    color: primaryColor,
    fontSize: fontSizeL,
    marginHorizontal: getEachOS({ ios: 32, android: 0, web: 0 }),
    alignSelf: getEachOS({ ios: 'center', android: 'center', web: 'left' }),
  },
  headerTintColor: primaryColor,
  headerLeftContainerStyle: {
    paddingHorizontal: getEachOS({ ios: 0, android: 0, web: 0 }),
  },
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

export const DefaultDiaryOptions: StackNavigationOptions = {
  headerTitleAlign: getEachOS({
    ios: 'center',
    android: 'left',
    web: 'center',
  }),
  headerTitleContainerStyle: {
    flex: 1,
    marginRight: 64,
    marginLeft: 64,
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
