import { ThemeSubcategoryInfo } from '@/screens/SelectThemeSubcategoryScreen/interface';
import { Language } from '@/types';
import { Animated } from 'react-native';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  themeSubcategoryInfo?: ThemeSubcategoryInfo;
  learnLanguage: Language;
  isForce?: boolean;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onFocusText: () => void;
  onBlurText: () => void;
  onPressThemeGuide: () => void;
  fadeAnim?: Animated.Value;
}
