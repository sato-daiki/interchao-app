import { PathConfigMap } from '@react-navigation/native';

const common = {
  UserProfile: {
    path: ':userName',
  },
  ReviewList: {
    path: 'reviews/:userName',
  },
  UserDiary: {
    path: ':userName/:objectID',
  },
};

export const getConfig = ():
  | {
      initialRouteName?: string | undefined;
      screens: PathConfigMap;
    }
  | undefined => {
  return {
    screens: {
      Auth: {
        path: '',
        initialRouteName: 'Initialize',
        screens: {
          Initialize: {
            path: '',
          },
          SelectLanguage: {
            path: 'create',
            exact: true,
          },
          InputUserName: {
            path: 'create',
          },
          SignIn: {
            path: 'login',
          },
          SignUp: {
            path: 'create',
          },
          ForegetPassword: {
            path: 'foreget',
          },
          // notfound: '*',
        },
      },
      Main: {
        path: '/',
        initialRouteName: 'Home',
        screens: {
          Home: {
            path: '',
            screens: {
              MyDiaryTab: {
                path: '',
                initialRouteName: 'MyDiaryList',
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
                    path: 'my/:userName/:objectID',
                  },
                  ...common,
                },
              },
              TeachDiaryTab: {
                path: '',
                initialRouteName: 'TeachDiaryList',
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
                initialRouteName: 'MyPage',
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
            initialRouteName: 'EditMyProfile',
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
          ModalAbout: {
            path: '',
            screens: {
              About: {
                path: 'about',
              },
            },
          },
        },
      },
      // Loading: {
      //   path: '/',
      //   initialRouteName: '',
      //   screens: {
      //     Loading: {
      //       path: '',
      //     },
      //   },
      // },
      // Public: {
      //   path: '',
      //   // screens: {
      //   //   UserDiary: {
      //   //     path: ':userName/:objectID',
      //   //   },
      //   // },
      // },
    },
  };
};
