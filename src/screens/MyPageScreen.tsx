import React, { useState, useEffect } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

// const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    // height: 32,
  },
  title: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 18,
  },
});

/**
 * マイページ
 */
const MyPageScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [headerMaxHeight, setHeaderMaxHeight] = useState(100);
  const [title, setTitle] = useState(0);

  useEffect(() => {
    setTitle(100);
  }, []);

  const onLayout = (event: LayoutChangeEvent): void => {
    setHeaderMaxHeight(event.nativeEvent.layout.height + HEADER_MIN_HEIGHT);
  };

  const renderScrollViewContent = () => {
    const data = Array.from({ length: 30 });
    return (
      <View style={{ marginTop: headerMaxHeight }}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, headerMaxHeight - HEADER_MIN_HEIGHT],
    outputRange: [headerMaxHeight, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        {renderScrollViewContent()}
      </ScrollView>

      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.bar} onLayout={onLayout}>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>mmm</Text>
          <Text>qqqqq∂</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default MyPageScreen;
