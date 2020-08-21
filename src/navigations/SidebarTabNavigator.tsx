import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, createNavigator, TabRouter } from 'react-navigation';
import { SidebarTabs } from '../components/web/molecules';
import { borderLightColor, maxMain } from '../styles/Common';

// 有料サイトだがここ参考にした
// https://medium.com/@bruno.eduardo.do/creating-a-custom-side-tab-navigator-with-react-navigation-28304b83e865

// ソースはここ
// https://github.com/bruno-edo/SidebarTabNavigator
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  warapper: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: maxMain,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  activeScreen: {
    borderColor: borderLightColor,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
});

const SidebarTabsNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.warapper}>
        <View style={styles.container}>
          <SidebarTabs navigation={navigation} />
          <View style={styles.activeScreen}>
            <ActiveScreen navigation={descriptor.navigation} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);
  return createNavigator(SidebarTabsNavigator, customTabRouter, {});
};

export default createSidebarNavigator;
