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
    title: I18n.t('selectThemeSubcategory.first.selfIntroduction.title'),
    text: I18n.t('selectThemeSubcategory.first.selfIntroduction.text'),
    source: President,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'hobby',
    title: I18n.t('selectThemeSubcategory.first.hobby.title'),
    text: I18n.t('selectThemeSubcategory.first.hobby.text'),
    source: Baseball,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'job',
    title: I18n.t('selectThemeSubcategory.first.job.title'),
    text: I18n.t('selectThemeSubcategory.first.job.text'),
    source: Office,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'study',
    title: I18n.t('selectThemeSubcategory.first.study.title'),
    text: I18n.t('selectThemeSubcategory.first.study.text'),
    source: Grind,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'dream',
    title: I18n.t('selectThemeSubcategory.first.dream.title'),
    text: I18n.t('selectThemeSubcategory.first.dream.text'),
    source: GraduationSpeech,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'trip',
    title: I18n.t('selectThemeSubcategory.first.trip.title'),
    text: I18n.t('selectThemeSubcategory.first.trip.text'),
    source: Airplane,
  },
  {
    themeCategory: 'first',
    themeSubcategory: 'reborn',
    title: I18n.t('selectThemeSubcategory.first.reborn.title'),
    text: I18n.t('selectThemeSubcategory.first.reborn.text'),
    source: Skull,
  },
];
