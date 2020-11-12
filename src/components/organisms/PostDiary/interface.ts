import { SubcatergoryInfo } from '@/screens/SelectSubcategoryScreen/interface';
import { Language } from '@/types';
import { Animated } from 'react-native';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  subcatergoryInfo?: SubcatergoryInfo;
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
