import en from '../assets/flags/en.svg'
import ru from '../assets/flags/ru.svg'
import { Languages, LanguagesType } from '../types/types';


export const LanguagesStructure = new Map<Languages, LanguagesType>(
  [
    [
      Languages.ru, {
        imgPath: ru,
        value: 'ру',
        validation: new RegExp(/^.*[а-яА-я]$/)
      }
    ],
    [
      Languages.en, {
        imgPath: en,
        value: 'en',
        validation: new RegExp(/^.*[a-zA-Z]$/)
      }
    ]
  ]
);

export const languageNamesArray = Array.from(LanguagesStructure.keys())
export const languageObjectsArray = Array.from(LanguagesStructure.values())
