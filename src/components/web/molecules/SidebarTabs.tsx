import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationStackProp } from 'react-navigation-stack';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import {
  primaryColor,
  mainColor,
  maxLayoutChange,
  fontSizeL,
  fontSizeM,
} from '../../../styles/Common';
import { SubmitButton, Space } from '../../atoms';
import I18n from '../../../utils/I18n';
import { IconSmall } from '../../../images/web';
import { TabIcon } from '../../molecules';

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    marginHorizontal: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    paddingVertical: 12,
  },
  icon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    alignSelf: 'center',
  },
  interchao: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
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

  const viewStyle = { width: isMaxLayoutChange ? 220 : 60 };
  return (
    <View style={[styles.container, viewStyle]}>
      <TouchableOpacity
        onPress={(): void => {
          navigation.navigate('MyDiaryList');
        }}
        style={styles.row}
      >
        <Image source={IconSmall} style={styles.icon} />
        {isMaxLayoutChange ? (
          <View style={styles.textContainer}>
            <Text style={styles.interchao}>Interchao</Text>
          </View>
        ) : null}
      </TouchableOpacity>
      {routes.map((route, tabIndex) => {
        const { routeName, params } = route;
        const { tabName } = params || {};
        const color = tabIndex === index ? mainColor : primaryColor;

        let icon;
        let name;
        switch (tabName) {
          case 'myDiary':
            icon = (
              <TabIcon
                name="book-open"
                size={25}
                color={color}
                badgeMode="myDiary"
              />
            );
            name = I18n.t('mainTab.myDiary');
            break;
          case 'teachDiary':
            icon = (
              <MaterialCommunityIcons
                name="spellcheck"
                size={25}
                color={color}
              />
            );
            name = I18n.t('mainTab.teachDiary');
            break;
          case 'myPage':
            icon = <MaterialIcons name="person" size={25} color={color} />;
            name = I18n.t('mainTab.myPage');
            break;
          default:
        }
        return (
          <TouchableOpacity
            onPress={(): void => {
              navigation.navigate(routeName);
            }}
            style={styles.row}
            key={route.routeName}
          >
            {icon}
            {isMaxLayoutChange ? (
              <View style={styles.textContainer}>
                <Text style={[styles.text, { color }]}>{name}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
      <Space size={24} />
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
