import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreenContainer from '../containers/DraftDiaryListScreenContainer';
import { mainColor } from '../styles/Common';
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
import FavoriteUserListScreen from '../screens/FavoriteUserListScreen';
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
import EditCorrectionCommentScreen from '../screens/EditCorrectionCommentScreen';
import EditCorrectionSummaryScreen from '../screens/EditCorrectionSummaryScreen';
import ReviewListScreen from '../screens/ReviewListScreen';
import TutorialListScreen from '../screens/TutorialListScreen';
import { TabIcon } from '../components/molecules';

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

const ModalCorrectingNavigator = createStackNavigator({
  Correcting: { screen: CorrectingScreenContainer },
  EditCorrectionComment: { screen: EditCorrectionCommentScreen },
  EditCorrectionSummary: { screen: EditCorrectionSummaryScreen },
});

const ModalEditMyProfileNavigator = createStackNavigator(
  {
    EditMyProfile: { screen: EditMyProfileScreenContainer },
    EditUserName: { screen: EditUserNameScreenContainer },
  },
  {
    initialRouteName: 'EditMyProfile',
  }
);

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreenContainer,
    },
    MyDiarySearch: {
      screen: MyDiarySerchScreen,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreenContainer,
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
      screen: TutorialListScreen,
    },
    Notice: {
      screen: NoticeScreenContainer,
    },
    Premium: {
      screen: PremiumScreen,
    },
    FavoriteUserList: {
      screen: FavoriteUserListScreen,
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
    UserProfile: {
      screen: UserProfileScreen,
    },
    ReviewList: {
      screen: ReviewListScreen,
    },
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
    UserProfile: {
      screen: UserProfileScreen,
    },
    ReviewList: {
      screen: ReviewListScreen,
    },
  },
  {
    initialRouteName: 'TeachDiaryList',
  }
);

const MainTab = createBottomTabNavigator(
  {
    MyDiary: {
      screen: MyDiaryTabStack,
      navigationOptions: {
        tabBarLabel: 'マイ日記',
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
    PostDiary: {
      screen: PostDiaryScreen,
      navigationOptions: {
        tabBarLabel: '日記を書く',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons name="pencil" size={25} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate('ModalPostDiary'),
      },
    },
    TeachDiary: {
      screen: TeachDiaryTabStack,
      navigationOptions: {
        tabBarLabel: 'みんなの日記',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons
            name="account-multiple"
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

export default createStackNavigator(
  {
    Home: {
      screen: MainTab,
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
  }
);
