import { Subcatergory } from '@/types/themeDiary';
import { ImageSourcePropType } from 'react-native';

export type CallerThemeGuide = 'PostDiary' | 'SelectSubcategory';

export interface SubcatergoryInfo {
  key: Subcatergory;
  title: string;
  text: string;
  source: ImageSourcePropType;
}
