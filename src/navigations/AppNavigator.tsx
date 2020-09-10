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
                path: 'home',
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
          TeachDiaryTab: {
            path: '',
            screens: {
              TeachDiaryList: {
                path: 'entries',
              },
              TeachDiarySearch: {
                path: 'search',
              },
              TeachDiary: {
                path: ':userName/:objectID',
              },
              ...common,
            },
          },
          MyPageTab: {
            path: '',
            screens: {
              MyPage: {
                path: 'mypage',
              },
              Setting: {
                path: 'setting',
              },
              TutorialList: {
                path: 'tutorials',
              },
              Notice: {
                path: 'notice',
              },
              Inquiry: {
                path: 'inquiry',
              },
              EditEmail: {
                path: 'setting/mail',
              },
              EditPassword: {
                path: 'setting/password',
              },
              RegisterEmailPassword: {
                path: 'setting/register',
              },
              DeleteAcount: {
                path: 'setting/delete',
              },
              ForegetPassword: {
                path: 'setting/foreget',
              },
              ...common,
            },
          },
        },
      },
      ModalPostDiary: {
        path: '',
        screens: {
          PostDiary: {
            path: 'entry/new',
          },
        },
      },
      ModalPostDraftDiary: {
        path: '',
        screens: {
          PostDraftDiary: {
            path: 'entries/:objectID/edit',
          },
        },
      },
      ModalEditMyProfile: {
        path: '',
        screens: {
          EditMyProfile: {
            path: 'mypage/edit',
          },
          EditUserName: {
            path: 'mypage/edit',
          },
        },
      },
      ModalCorrecting: {
        path: '',
        screens: {
          Correcting: {
            path: ':userName/:objectID/correcting',
          },
        },
      },
      ModalReview: {
        path: '',
        screens: {
          Review: {
            path: ':userName/:objectID/:correctedNum/review',
          },
        },
      },
      Initialize: {
        path: '/',
      },
      SelectLanguage: {
        path: '/create',
      },
      InputUserName: {
        path: '/create',
      },
      SignIn: {
        path: '/login',
      },
      SignUp: {
        path: '/create',
      },
      ForegetPassword: {
        path: '/foreget',
      },
      NotFound: '*',
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
