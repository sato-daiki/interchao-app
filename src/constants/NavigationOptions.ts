import { NavigationStackOptions } from 'react-navigation-stack';
import { primaryColor, fontSizeL, maxModal, maxAuth } from '../styles/Common';
import { getEachOS } from '../utils/common';

export const DefaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    textAlign: getEachOS({ ios: 'center', android: 'left', web: 'center' }),
    fontWeight: getEachOS({ ios: '700', android: '500', web: '700' }),
    color: primaryColor,
    fontSize: fontSizeL,
    marginHorizontal: getEachOS({ ios: 32, android: 0, web: 32 }),
    alignSelf: 'center',
  },
  headerTintColor: primaryColor,
  headerRightContainerStyle: {
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: getEachOS({ ios: 16, android: 0, web: 0 }),
  },
  headerBackTitleStyle: {
    display: 'none',
  },
};

export const DefaultSearchBarOptions: NavigationStackOptions = {
  headerTitleAlign: 'center',
  headerTitleContainerStyle: {
    flex: 1,
    marginRight: 64,
  },
};

export const DefaultDiaryOptions: NavigationStackOptions = {
  headerTitleAlign: getEachOS({
    ios: 'center',
    android: 'left',
    web: 'center',
  }),
  headerTitleContainerStyle: {
    flex: 1,
    marginRight: 64,
    marginLeft: 64,
  },
};

export const DefaultModalLayoutOptions: NavigationStackOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxModal,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
  },
};

export const DefaultAuthLayoutOptions: NavigationStackOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxAuth,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
  },
};
