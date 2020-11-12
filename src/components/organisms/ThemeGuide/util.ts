import { Subcatergory } from '@/types/themeDiary';
import { hobby } from './config';
import { Entry } from './interface';

export const getEntries = (key: Subcatergory): Entry[] | null => {
  let entries: Entry[] | null = null;
  switch (key) {
    case 'hobby':
      entries = hobby;
      break;
    default:
      return null;
  }

  return entries.concat({ key: 'end' });
};
