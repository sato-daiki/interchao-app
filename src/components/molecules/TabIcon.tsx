import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';
import { User } from '../../types';
import { State } from '../../types/state';

interface Props {
  name: string;
  size: number;
  color: string;
  badgeMode: string;
}

const styles = StyleSheet.create({
  badge: {
    width: 8,
    height: 8,
    top: -4,
    right: -4,
    position: 'absolute',
  },
});

const getBadgeStatus = (badgeMode: string, user: User): number => {
  const { unreadCorrection = 0 } = user;
  if (badgeMode === 'myDiary' && unreadCorrection > 0) {
    return unreadCorrection;
  }
  return 0;
};

const TabIcon = ({ name, size, color, badgeMode }: Props): JSX.Element => {
  const localStatus = useSelector(
    (state: State) => state.rootReducer.user,
    shallowEqual
  );
  // check badge show or not
  const badgeNum = getBadgeStatus(badgeMode, localStatus);
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size} color={color} />
      {badgeNum > 0 ? (
        <Badge containerStyle={styles.badge} status="error" value={badgeNum} />
      ) : null}
    </View>
  );
};

export default TabIcon;
