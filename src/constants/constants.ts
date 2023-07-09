import { Languages, LanguagesType } from '../types/types';
import { En } from '../ui/Icons/En';
import { Ru } from '../ui/Icons/Ru';


export const LanguagesStructure = new Map<Languages, LanguagesType>(
  [
    [
      Languages.ru, {
        flag: Ru,
        value: 'ру',
        validation: new RegExp(/^.*[а-яА-я]$/)
      }
    ],
    [
      Languages.en, {
        flag: En,
        value: 'en',
        validation: new RegExp(/^.*[a-zA-Z]$/)
      }
    ]
  ]
);

export const languageNamesArray = Array.from(LanguagesStructure.keys())
export const languageObjectsArray = Array.from(LanguagesStructure.values())
