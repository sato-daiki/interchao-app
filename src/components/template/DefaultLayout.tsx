import * as React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { maxAuth, maxModal } from '../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  lSize?: boolean;
}

const styles = StyleSheet.create({
  warapper: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: maxAuth,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
  },
});

const DefaultLayout: React.FC<Props> = ({
  containerStyle,
  lSize = false,
  children,
}) => (
  <View style={styles.warapper}>
    <View
      style={[
        styles.container,
        { maxWidth: lSize ? maxModal : maxAuth },
        containerStyle,
      ]}
    >
      {children}
    </View>
  </View>
);

export default DefaultLayout;
