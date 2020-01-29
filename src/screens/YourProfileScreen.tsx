import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  LayoutChangeEvent,
  Dimensions,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { TabView, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

export const { width } = Dimensions.get('window');
export const { height } = Dimensions.get('window');

const TAB_HEIGHT = 47;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

const tabs = [
  { key: 'music', title: 'Music' },
  { key: 'albums', title: 'Albums' },
  { key: 'recents', title: 'Recents' },
  { key: 'purchased', title: 'Purchased' },
];

/**
 * プロフィール画面
 */
const YourProfileScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  // const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [headerMaxHeight, setHeaderMaxHeight] = useState(100);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(tabs);

  const y = useRef(new Animated.Value(0)).current;

  const translateY = useRef(
    Animated.interpolate(y, {
      inputRange: [0, headerMaxHeight],
      outputRange: [0, -headerMaxHeight],
      extrapolate: Animated.Extrapolate.CLAMP,
    })
  ).current;

  const AnimatedScrollView: React.FC<{}> = useCallback(
    ({ children }): JSX.Element => (
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
          useNativeDriver: true,
        })}
        style={{ paddingTop: headerMaxHeight + TAB_HEIGHT }}
        contentContainerStyle={styles.scrollContainer}
      >
        {children}
      </Animated.ScrollView>
    ),
    [headerMaxHeight, y]
  );

  const onLayout = (event: LayoutChangeEvent): void => {
    setHeaderMaxHeight(event.nativeEvent.layout.height);
  };

  const renderScene = ({ route, jumpTo }): JSX.Element => {
    const data = Array.from({ length: 30 });

    switch (route.key) {
      case 'music':
        return (
          <AnimatedScrollView>
            {data.map((_, i) => (
              <View key={i} style={styles.row}>
                <Text>Hellow world, music</Text>
              </View>
            ))}
          </AnimatedScrollView>
        );
      case 'albums':
        return (
          <AnimatedScrollView>
            {data.map((_, i) => (
              <View key={i} style={styles.row}>
                <Text>Hellow world, albums</Text>
              </View>
            ))}
          </AnimatedScrollView>
        );
      default:
        return (
          <AnimatedScrollView>
            {data.map((_, i) => (
              <View key={i} style={styles.row}>
                <Text>Hellow world, ohters</Text>
              </View>
            ))}
          </AnimatedScrollView>
        );
    }
  };

  const renderTabBar = props => {
    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: headerMaxHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        <View onLayout={onLayout}>
          <Text>aaa</Text>
          <Text>aaa</Text>
          <Text>aaa</Text>
          <Text>aaa</Text>
          <Text>aaa</Text>
          <Text>aaa</Text>
          <TabBar {...props} tabStyle={{ backgroundColor: 'red' }} />
        </View>
      </Animated.View>
    );
  };

  return (
    <TabView
      style={{ height, width }}
      navigationState={{ index, routes }}
      onIndexChange={(i: number): void => setIndex(i)}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  );
};

export default YourProfileScreen;
