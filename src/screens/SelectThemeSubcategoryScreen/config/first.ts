import {
  Airplane,
  Baseball,
  GraduationSpeech,
  Grind,
  Office,
  President,
  Skull,
} from '@/images';
import I18n from '@/utils/I18n';
import { ThemeSubcategoryInfo } from '../interface';

export const first: ThemeSubcategoryInfo[] = [
  {
    themeCategory: 'first',
    themeSubcategory: 'selfIntroduction',
    title: I18n.t('selectThemeSubcategory.firstList.selfIntroduction'),
    source: President,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'hobby',
    title: I18n.t('selectThemeSubcategory.firstList.hobby'),
    source: Baseball,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'job',
    title: I18n.t('selectThemeSubcategory.firstList.job'),
    source: Office,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'study',
    title: I18n.t('selectThemeSubcategory.firstList.study'),
    source: Grind,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'dream',
    title: I18n.t('selectThemeSubcategory.firstList.dream'),
    source: GraduationSpeech,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'trip',
    title: I18n.t('selectThemeSubcategory.firstList.trip'),
    source: Airplane,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'reborn',
    title: I18n.t('selectThemeSubcategory.firstList.reborn'),
    source: Skull,
  },
];
