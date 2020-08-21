import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationStackProp } from 'react-navigation-stack';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import {
  fontSizeM,
  primaryColor,
  mainColor,
  maxLayoutChange,
} from '../../../styles/Common';
import { SubmitButton } from '../../atoms';
import I18n from '../../../utils/I18n';

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    marginHorizontal: 16,
    marginTop: 32,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: fontSizeM,
    marginLeft: 12,
  },
  post: {
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
  },
});

const SidebarTabs = ({ navigation }: Props): JSX.Element => {
  const { routes, index } = navigation.state;
  const isMaxLayoutChange = useMediaQuery({ minWidth: maxLayoutChange });

  return (
    <View style={[styles.container, { width: isMaxLayoutChange ? 220 : 60 }]}>
      {routes.map((route, tabIndex) => {
        const { routeName, params } = route;
        const { icon, tabName } = params || {};
        const color = tabIndex === index ? mainColor : primaryColor;

        return (
          <TouchableOpacity
            onPress={(): void => {
              navigation.navigate(routeName);
            }}
            style={styles.tab}
            key={route.routeName}
          >
            <MaterialCommunityIcons name={icon} size={25} color={color} />
            {isMaxLayoutChange ? (
              <View style={styles.textContainer}>
                <Text style={[styles.text, { color }]}>{tabName}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}

      {isMaxLayoutChange ? (
        <SubmitButton
          title={I18n.t('mainTab.postDiary')}
          onPress={(): void => {
            navigation.navigate('ModalPostDiary');
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.post}
          onPress={(): void => {
            navigation.navigate('ModalPostDiary');
          }}
        >
          <MaterialCommunityIcons name="pencil" size={25} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SidebarTabs;
