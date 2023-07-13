export type duplicatedLettersMapType = {
  key: string
  value: number
}

export enum Languages {
  ru = 'ru',
  en = 'en',
}

export type LanguagesType = {
  flag: () => React.JSX.Element
  value: string
  validation: RegExp
}
