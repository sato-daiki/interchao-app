/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import '@expo/match-media';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, fontSizeL, mainColor } from '../../../styles/Common';
import { IconSmall } from '../../../images/web';
import I18n from '../../../utils/I18n';
import { SubmitButton } from '../../atoms';

type Props = {
  isMaxLayoutChange: boolean;
} & DrawerContentComponentProps<DrawerContentOptions>;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
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
  submitButton: {
    width: 200,
  },
  post: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
  },
});

const CustomDrawerContent = ({
  isMaxLayoutChange,
  ...props
}: Props): JSX.Element => {
  const containerStyle = {
    alignItems: isMaxLayoutChange ? 'flex-start' : 'center',
  } as StyleProp<ViewStyle>;

  const itemStyle = { width: isMaxLayoutChange ? 218 : 40 } as StyleProp<
    ViewStyle
  >;

  const marginLeft = { marginLeft: isMaxLayoutChange ? 0 : 32 };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={containerStyle}>
        <DrawerItem
          label={(): JSX.Element => (
            <View style={styles.row}>
              <Image source={IconSmall} style={[styles.icon, marginLeft]} />
              <Text style={styles.interchao}>
                {isMaxLayoutChange ? 'Interchao' : null}
              </Text>
            </View>
          )}
          onPress={(): void => props.navigation.navigate('MyDiaryTab')}
        />
        <DrawerItemList itemStyle={itemStyle} {...props} />

        <DrawerItem
          label={(): JSX.Element => {
            return isMaxLayoutChange ? (
              <SubmitButton
                containerStyle={styles.submitButton}
                title={I18n.t('mainTab.postDiary')}
                onPress={(): void => {
                  props.navigation.navigate('ModalPostDiary', {
                    screen: 'PostDiary',
                  });
                }}
              />
            ) : (
              <View style={[styles.post, marginLeft]}>
                <MaterialCommunityIcons name="pencil" size={25} color="#fff" />
              </View>
            );
          }}
          onPress={(): void => {
            props.navigation.navigate('ModalPostDiary', {
              screen: 'PostDiary',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
