import { Injectable } from '@angular/core';

const LANGUAGE_MAP: { [key: string]: string } = {
  en: 'English',
  pl: 'Polish',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  it: 'Italian',
  ja: 'Japanese',
  zh: 'Chinese',
  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  he: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  zu: 'Zulu',
};

@Injectable()
export class LanguageService {
  constructor() {}

  getBrowserLanguage(): string {
    const langCode = navigator.language.split('-')[0].toLowerCase();
    return LANGUAGE_MAP[langCode] || 'Unknown';
  }
}
