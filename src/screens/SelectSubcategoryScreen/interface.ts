import { Subcatergory } from '@/types/themeDiary';
import { ImageSourcePropType } from 'react-native';

export interface SubcatergoryInfo {
  key: Subcatergory;
  title: string;
  text: string;
  source: ImageSourcePropType;
}
