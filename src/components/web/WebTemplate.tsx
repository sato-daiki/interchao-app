import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { maxWindowWidth, offWhite } from '../../styles/Common';

interface Props {
  isPcWidth: boolean;
  leftTop: boolean;
  warapper?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  leftContainer?: StyleProp<ViewStyle>;
  centerContainer?: StyleProp<ViewStyle>;
  rightContainer?: StyleProp<ViewStyle>;
  renderLeft?: ReactNode;
  renderCenter?: ReactNode;
  renderRight?: ReactNode;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offWhite,
    paddingBottom: 64,
  },
  container: {
    width: '100%',
    maxWidth: maxWindowWidth,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  containerPc: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerSp: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  partContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
});

const WebTemplate = ({
  isPcWidth,
  leftTop,
  warapper,
  container,
  leftContainer,
  centerContainer,
  rightContainer,
  renderLeft,
  renderCenter,
  renderRight,
}: Props): JSX.Element => {
  return (
    <View style={[styles.warapper, warapper]}>
      <View
        style={[
          styles.container,
          isPcWidth
            ? styles.containerPc
            : {
                ...styles.containerSp,
                flexDirection: leftTop ? 'column' : 'column-reverse',
              },
          container,
        ]}
      >
        {renderLeft ? (
          <View
            style={[
              styles.partContainer,
              { paddingBottom: !isPcWidth && leftTop ? 32 : 0 },
              leftContainer,
            ]}
          >
            {renderLeft}
          </View>
        ) : null}
        {renderCenter ? (
          <View style={[styles.partContainer, centerContainer]}>
            {renderCenter}
          </View>
        ) : null}
        {renderRight ? (
          <View
            style={[
              styles.partContainer,
              { paddingBottom: !isPcWidth && !leftTop ? 32 : 0 },
              rightContainer,
            ]}
          >
            {renderRight}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default WebTemplate;
