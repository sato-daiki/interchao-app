import * as React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { offWhite, maxWindowWidth } from '../../styles/Common';

const { width } = Dimensions.get('window');
interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width,
    maxWidth: maxWindowWidth,
    backgroundColor: '#fff',
  },
});

const DefaultLayout: React.FC<Props> = ({ containerStyle, children }) => (
  <View style={[styles.container]}>
    <View style={[styles.main, containerStyle]}>{children}</View>
  </View>
);

export default DefaultLayout;
