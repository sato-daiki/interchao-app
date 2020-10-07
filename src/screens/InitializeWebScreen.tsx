import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import Lp from '../components/organisms/Lp';
import HtmlHeader from '../components/web/organisms/HtmlHeader';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type InitializeWebNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Initialize'
>;

type InitializeWebRouteProp = RouteProp<AuthStackParamList, 'Initialize'>;

type ScreenType = {
  navigation: InitializeWebNavigationProp;
  route: InitializeWebRouteProp;
};

const InitializeWebScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const options =
    !route.params || !route.params.lang
      ? undefined
      : { locale: route.params.lang };

  return (
    <>
      <HtmlHeader options={options} />
      <Lp
        isAbout={false}
        options={options}
        onPressHeader={(): void => {
          navigation.navigate('Initialize');
        }}
        onPressStart={(): void => {
          navigation.navigate('SelectLanguage');
        }}
        onPressLogin={(): void => {
          navigation.navigate('SignIn');
        }}
      />
    </>
  );
};

export default InitializeWebScreen;
