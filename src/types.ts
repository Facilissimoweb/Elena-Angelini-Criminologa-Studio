import type { Language } from './translations';
import { translations, languagesList } from './translations';
export type { Language };
export { translations, languagesList };

export type PageId = 'home' | 'chi-siamo' | 'servizi' | 'punti-forza' | 'testimonianze' | 'contatti' | 'faq' | 'blog' | 'tariffe';

export interface ServiceItem {
  id: string;
  code: string;
  titleKey: keyof typeof translations.it;
  descKey: keyof typeof translations.it;
  iconName: 'Search' | 'AlertTriangle' | 'Briefcase' | 'Map';
}

export interface StrengthItem {
  id: string;
  num: string;
  titleKey: keyof typeof translations.it;
  descKey: keyof typeof translations.it;
  iconName: 'Shield' | 'Cpu' | 'Activity';
}

export interface TestimonialItem {
  id: string;
  textKey: keyof typeof translations.it;
  authorKey: keyof typeof translations.it;
  tagKey: keyof typeof translations.it;
}

export const servicesData: ServiceItem[] = [
  {
    id: 's1',
    code: 'DET_RE_01',
    titleKey: 's1-title',
    descKey: 's1-desc',
    iconName: 'Search',
  },
  {
    id: 's2',
    code: 'DET_RE_02',
    titleKey: 's2-title',
    descKey: 's2-desc',
    iconName: 'AlertTriangle',
  },
  {
    id: 's3',
    code: 'DET_RE_03',
    titleKey: 's3-title',
    descKey: 's3-desc',
    iconName: 'Briefcase',
  },
  {
    id: 's4',
    code: 'DET_RE_04',
    titleKey: 's4-title',
    descKey: 's4-desc',
    iconName: 'Map',
  },
];

export const strengthsData: StrengthItem[] = [
  {
    id: 'v1',
    num: '01',
    titleKey: 'v1-title',
    descKey: 'v1-desc',
    iconName: 'Shield',
  },
  {
    id: 'v2',
    num: '02',
    titleKey: 'v2-title',
    descKey: 'v2-fora-desc',
    iconName: 'Cpu',
  },
  {
    id: 'v3',
    num: '03',
    titleKey: 'v3-title',
    descKey: 'v3-desc',
    iconName: 'Activity',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    textKey: 't1-text',
    authorKey: 't1-author',
    tagKey: 't-case1',
  },
  {
    id: 't2',
    textKey: 't2-text',
    authorKey: 't2-author',
    tagKey: 't-case2',
  },
  {
    id: 't3',
    textKey: 't3-text',
    authorKey: 't3-author',
    tagKey: 't-case3',
  },
  {
    id: 't4',
    textKey: 't4-text',
    authorKey: 't4-author',
    tagKey: 't-case4',
  },
];
