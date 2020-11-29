import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import Lp from '@/components/organisms/Lp';
import HtmlHeader from '@/components/web/organisms/HtmlHeader';
import { AuthStackParamList } from '@/navigations/AuthNavigator';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Initialize'>;

type InitializeWebRouteProp = RouteProp<AuthStackParamList, 'Initialize'>;

type ScreenType = {
  navigation: NavigationProp;
  route: InitializeWebRouteProp;
};

const InitializeScreen: React.FC<ScreenType> = ({ navigation, route }) => {
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
          navigation.navigate('CreateAccount', { screen: 'SelectLanguage' });
        }}
        onPressLogin={(): void => {
          navigation.navigate('CreateAccount', { screen: 'SignIn' });
        }}
      />
    </>
  );
};

export default InitializeScreen;
