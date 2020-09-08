import React from 'react';
import * as Linking from 'expo-linking';

import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';

const prefix = Linking.makeUrl('/');

const common = {
  UserProfileScreen: {
    path: ':userName',
  },
  UserDiary: {
    path: ':userName/:objectID',
  },
  ReviewList: {
    path: ':userName/reviews',
  },
};

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: {
        path: '',
        screens: {
          MyDiaryTab: {
            path: '',
            screens: {
              MyDiaryList: {
                path: 'entries',
              },
              MyDiarySearch: {
                path: 'my/search',
              },
              DraftDiaryList: {
                path: 'drafts',
              },
              MyDiary: {
                path: ':userName/:objectID',
              },
              ...common,
            },
          },
        },
      },
    },
  },
} as LinkingOptions;

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer linking={linking}>
      <AuthLoadingScreenContainer />
    </NavigationContainer>
  );
};

export default AppNavigator;
