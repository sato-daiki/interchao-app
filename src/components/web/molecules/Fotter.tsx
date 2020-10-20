import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { maxLayoutChange, offBlack, offWhite } from '../../../styles/Common';
import { Hoverable } from '../../atoms';

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offBlack,
  },
  container: {
    width: '100%',
    maxWidth: maxLayoutChange,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 24,
    paddingHorizontal: 16,
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

const Fotter = (): JSX.Element => {
  const onPressBlog = (): void => {
    Linking.openURL('https://note.com/interchao');
  };
  const onPressTwitter = (): void => {
    Linking.openURL('https://twitter.com/interchao');
  };

  return (
    <View style={styles.warapper}>
      <View style={[styles.container]}>
        <View style={styles.row}>
          <Text style={styles.textSmall}>©2020 Interchao</Text>
          <View style={styles.right}>
            <Hoverable onPress={onPressBlog}>
              <Text style={styles.textMiddle}>Blog</Text>
            </Hoverable>

            <Hoverable onPress={onPressTwitter}>
              <MaterialCommunityIcons
                size={28}
                color={offWhite}
                name="twitter"
              />
            </Hoverable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Fotter;
