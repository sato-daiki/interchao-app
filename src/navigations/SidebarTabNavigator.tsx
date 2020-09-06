import * as React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  NavigationHelpersContext,
  TabRouter,
  createNavigatorFactory,
  useNavigationBuilder,
  DefaultNavigatorOptions,
  TabRouterOptions,
  TabNavigationState,
} from '@react-navigation/native';

import { maxMain, borderLightColor } from '../styles/Common';
import { SidebarTabs } from '../components/web/molecules';

// Supported screen options
type TabNavigationOptions = {};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<TabNavigationOptions> & TabRouterOptions;

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

const TabNavigator = ({
  initialRouteName,
  children,
  screenOptions,
}: Props): JSX.Element => {
  const { state, navigation, descriptors } = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    TabNavigationOptions,
    TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.warapper}>
          <View style={styles.container}>
            <SidebarTabs state={state} navigation={navigation} />
            <View style={styles.activeScreen}>
              {descriptors[state.routes[state.index].key].render()}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </NavigationHelpersContext.Provider>
  );
};

export const createMyNavigator = createNavigatorFactory<
  TabNavigationState,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
