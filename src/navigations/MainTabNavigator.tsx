import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon, TabLabel } from '../components/molecules';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreen from '../screens/DraftDiaryListScreen';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import ReviewScreenContainer from '../containers/ReviewScreenContainer';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import TeachDiaryListScreenContainer from '../containers/TeachDiaryListScreenContainer';
import MyDiaryScreenContainer from '../containers/MyDiaryScreenContainer';
import TeachDiaryScreenContainer from '../containers/TeachDiaryScreenContainer';
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditMyProfileScreenContainer from '../containers/EditMyProfileScreenContainer';
import SettingScreen from '../screens/SettingScreen';
import NoticeScreenContainer from '../containers/NoticeScreenContainer';
import PremiumScreen from '../screens/PremiumScreen';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/RegisterEmailPasswordScreen';
import EditUserNameScreenContainer from '../containers/EditUserNameScreenContainer';
import PostDraftDiaryScreenContainer from '../containers/PostDraftDiaryScreenContainer';
import CorrectingScreenContainer from '../containers/CorrectingScreenContainer';
import DeleteAcountScreen from '../screens/DeleteAcountScreen';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';
import MyDiarySerchScreen from '../screens/MyDiarySearchScreen';
import TeachDiarySearchScreenContainer from '../containers/TeachDiarySearchScreenContainer';
import ReviewListScreenContainer from '../containers/ReviewListScreenContainer';
import TutorialListScreenContainer from '../containers/TutorialListScreenContainer';
import InquiryScreenContainer from '../containers/InquiryScreenContainer';
import UserDiaryScreenContainer from '../containers/UserDiaryScreenContainer';
import createSidebarNavigator from './SidebarTabNavigator';

/* components */
const ModalPostDiaryNavigator = createStackNavigator({
  ModalPostDiary: { screen: PostDiaryScreenContainer },
});

const ModalPostDraftDiaryNavigator = createStackNavigator({
  PostDraftDiary: { screen: PostDraftDiaryScreenContainer },
});

const ModalReviewNavigator = createStackNavigator({
  Review: { screen: ReviewScreenContainer },
});

const ModalCorrectingNavigator = createStackNavigator(
  {
    Correcting: { screen: CorrectingScreenContainer },
  },
  {
    initialRouteName: 'Correcting',
    navigationOptions: {
      gestureEnabled: false,
    },
  }
);

const ModalEditMyProfileNavigator = createStackNavigator(
  {
    EditMyProfile: { screen: EditMyProfileScreenContainer },
    EditUserName: { screen: EditUserNameScreenContainer },
  },
  {
    initialRouteName: 'EditMyProfile',
  }
);

const commonDiaryNavigator = {
  UserProfile: {
    screen: UserProfileScreen,
  },
  UserDiary: {
    screen: UserDiaryScreenContainer,
  },
  ReviewList: {
    screen: ReviewListScreenContainer,
  },
};

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreenContainer,
    },
    MyDiarySearch: {
      screen: MyDiarySerchScreen,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreen,
    },
    MyDiary: {
      screen: MyDiaryScreenContainer,
    },
    MyPage: {
      screen: MyPageScreenContainer,
    },
    Setting: {
      screen: SettingScreen,
    },
    TutorialList: {
      screen: TutorialListScreenContainer,
    },
    Notice: {
      screen: NoticeScreenContainer,
    },
    Inquiry: {
      screen: InquiryScreenContainer,
    },
    Premium: {
      screen: PremiumScreen,
    },
    EditEmail: {
      screen: EditEmailScreen,
    },
    EditPassword: {
      screen: EditPasswordScreen,
    },
    RegisterEmailPassword: {
      screen: RegisterEmailPasswordScreen,
    },
    DeleteAcount: {
      screen: DeleteAcountScreen,
    },
    ForegetPassword: {
      screen: ForegetPasswordScreen,
    },
    ...commonDiaryNavigator,
  },
  {
    initialRouteName: 'MyDiaryList',
  }
);

const TeachDiaryTabStack = createStackNavigator(
  {
    TeachDiaryList: {
      screen: TeachDiaryListScreenContainer,
    },
    TeachDiarySearch: {
      screen: TeachDiarySearchScreenContainer,
    },
    TeachDiary: {
      screen: TeachDiaryScreenContainer,
    },
    ...commonDiaryNavigator,
  },
  {
    initialRouteName: 'TeachDiaryList',
  }
);

const createHomeTabNavigator = (isDesktopOrLaptopDevice: boolean) => {
  if (isDesktopOrLaptopDevice) {
    return createSidebarNavigator(
      {
        Home: {
          screen: MyDiaryTabStack,
          params: {
            icon: 'book-open',
            tabName: I18n.t('mainTab.myDiary'),
            badge: true,
          },
        },
        TeachDiaryTab: {
          screen: TeachDiaryTabStack,
          params: {
            icon: 'spellcheck',
            tabName: I18n.t('mainTab.teachDiary'),
            badge: false,
          },
        },
      },
      {
        initialRouteName: 'Home',
      }
    );
  }
  return createBottomTabNavigator(
    {
      MyDiaryTab: {
        screen: MyDiaryTabStack,
        navigationOptions: {
          tabBarLabel: I18n.t('mainTab.myDiary'),
          tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
            <TabIcon
              name="book-open"
              size={25}
              color={tintColor}
              badgeMode="myDiary"
            />
          ),
        },
      },
      PostDiaryTab: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        screen: PostDiaryScreen,
        navigationOptions: {
          tabBarLabel: I18n.t('mainTab.postDiary'),
          tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
            <MaterialCommunityIcons name="pencil" size={25} color={tintColor} />
          ),
          tabBarOnPress: ({ navigation }): void => {
            navigation.navigate('ModalPostDiary');
          },
        },
      },
      TeachDiaryTab: {
        screen: TeachDiaryTabStack,
        navigationOptions: {
          tabBarLabel: ({ tintColor }: { tintColor: string }): JSX.Element => (
            <TabLabel color={tintColor} />
          ),
          tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
            <MaterialCommunityIcons
              name="spellcheck"
              size={25}
              color={tintColor}
            />
          ),
        },
      },
    },
    {
      tabBarOptions: {
        activeTintColor: mainColor,
      },
    }
  );
};

export const createMainTabNavigator = (isDesktopOrLaptopDevice: boolean) => {
  return createStackNavigator(
    {
      Home: {
        screen: createHomeTabNavigator(isDesktopOrLaptopDevice),
      },
      ModalPostDiary: { screen: ModalPostDiaryNavigator },
      ModalEditMyProfile: {
        screen: ModalEditMyProfileNavigator,
      },
      ModalPostDraftDiary: {
        screen: ModalPostDraftDiaryNavigator,
      },
      ModalCorrecting: {
        screen: ModalCorrectingNavigator,
      },
      ModalReview: {
        screen: ModalReviewNavigator,
      },
    },
    {
      headerMode: 'none',
      mode: 'modal',
      defaultNavigationOptions: {
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      },
    }
  );
};
