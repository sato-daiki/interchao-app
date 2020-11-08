import {
  ModalPostDiaryStackNavigationProp,
  ModalPostDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, Profile, User } from '@/types';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDiaryStackParamList, 'PostDiary'>,
  ModalPostDiaryStackNavigationProp
>;

export type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;
