import { ThemeSubcategory } from '@/types';
import { hobby, selfIntroduction } from './config';
import { Entry } from './interface';

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

  return entries.concat({ key: 'end' });
};
