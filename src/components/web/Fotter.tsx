import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { minDeviceWidth, headerBlack, offWhite } from '../../styles/Common';
import { Icon } from '../../images';

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: headerBlack,
  },
  container: {
    width: '100%',
    maxWidth: minDeviceWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSmall: {
    fontSize: 12,
    color: offWhite,
    alignSelf: 'center',
  },
  textMiddle: {
    marginRight: 16,
    fontSize: 16,
    color: offWhite,
    alignSelf: 'center',
  },
});

const Fotter = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={styles.warapper}>
      <View style={[styles.container]}>
        <View style={styles.row}>
          <Text style={styles.textSmall}>©2020 Interchao</Text>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
                console.log();
              }}
            >
              <Text style={styles.textMiddle}>Blog</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              size={28}
              color={offWhite}
              name="twitter"
              onPress={() => {
                console.log();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Fotter;
