import {
  Airplane,
  Baseball,
  GraduationSpeech,
  Grind,
  Office,
  President,
  Skull,
} from '@/images';
import { SubcatergoryInfo } from '../interface';

export const first: SubcatergoryInfo[] = [
  {
    key: 'selfIntroduction',
    title: '自己紹介',
    text: '自己紹介について書きましょう',
    source: President,
  },
  {
    key: 'hobby',
    title: '趣味',
    text: '趣味について書きましょう',
    source: Baseball,
  },
  { key: 'job', title: '仕事の紹介', text: 'test', source: Office },
  {
    key: 'english',
    title: '英語を勉強する理由',
    text: '英語を勉強する理由について書きましょう',
    source: Grind,
  },
  { key: 'dream', title: '将来の夢', text: 'test', source: GraduationSpeech },
  { key: 'trip', title: '旅行', text: 'test', source: Airplane },
  {
    key: 'reborn',
    title: 'もし生まれ変わるなら',
    text: 'もし生まれ変わるならについて書きましょう',
    source: Skull,
  },
];
