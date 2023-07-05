import en from '../assets/flags/en.svg'
import ru from '../assets/flags/ru.svg'
import { Languages, LanguagesType } from '../types/types';


export const LanguagesStructure = new Map<Languages, LanguagesType>(
  [
    [
      Languages.ru, {
        imgPath: ru,
        value: 'ру'
      }
    ],
    [
      Languages.en, {
        imgPath: en,
        value: 'en'
      }
    ]
  ]
);
