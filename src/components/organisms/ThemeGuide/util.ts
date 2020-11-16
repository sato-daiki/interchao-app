import { ThemeSubcategory } from '@/types';
import { TextStyle } from 'react-native';
import { hobby, selfIntroduction } from './config';
import { Entry, StyleType } from './interface';

export const getEntries = (key: ThemeSubcategory): Entry[] | null => {
  let entries: Entry[] | null = null;
  switch (key) {
    case 'selfIntroduction':
      entries = selfIntroduction;
      break;
    case 'hobby':
      entries = hobby;
      break;
    default:
      return null;
  }

  return entries.concat({ key: 'end', params: null });
};

export const getStyle = (styleType: StyleType): TextStyle | undefined => {
  switch (styleType) {
    case 'bold':
      return {
        fontWeight: 'bold',
      };
    case 'p':
      return undefined;
    default:
      return undefined;
  }
};
