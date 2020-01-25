import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* screens */
import MyDiaryListScreen from '../screens/MyDiaryListScreen';
import YourDiaryListScreen from '../screens/YourDiaryListScreen';

/* components */
// import TabIcon from '../components/molecules/TabIcon';

const MainTab = createBottomTabNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreen,
      navigationOptions: {
        tabBarLabel: 'マイ日記',
      },
    },
    YourDiaryList: {
      screen: YourDiaryListScreen,
      navigationOptions: {
        tabBarLabel: 'みんなの日記',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  }
);

export default createStackNavigator({
  MainTab: {
    screen: MainTab,
  },
});