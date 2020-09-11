import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { primaryColor, fontSizeL, maxModal, maxAuth } from '../styles/Common';
import { getEachOS } from '../utils/common';
import { CusmtumHeaderBackButton } from '../components/web/atoms';

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
    paddingHorizontal: getEachOS({ ios: 16, android: 0, web: 0 }),
  },
  headerBackTitleStyle: {
    display: 'none',
  },
  headerLeft: props => <CusmtumHeaderBackButton {...props} />,
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
    maxWidth: maxModal,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
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
