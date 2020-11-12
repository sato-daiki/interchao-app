import { Subcatergory } from '@/types/themeDiary';
import { hobby } from './config';
import { Entry } from './interface';

export const getEntries = (key: Subcatergory): Entry[] | null => {
  switch (key) {
    case 'hobby':
      return hobby;
    default:
      return null;
  }
};
