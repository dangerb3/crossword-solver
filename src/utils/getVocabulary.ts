import axios from 'axios'
import { strFromU8, decompressSync } from 'fflate'
import md5 from 'js-md5'
import localforage from 'localforage'

import { Languages, LanguagesStoreType } from '../types/types'
import vocabulariesHashes from '../vocabularies.json'

export const getVocabulary = async (language: Languages) => {
  const parse = (bin: any) => {
    return strFromU8(decompressSync(new Uint8Array(bin)))
  }

  try {
    const localSavedLanguage = (await localforage.getItem(language)) as LanguagesStoreType | undefined

    if (localSavedLanguage) {
      if (localSavedLanguage.hash === vocabulariesHashes.find((lang) => lang.language === language)?.hash)
        return localSavedLanguage.data
    }

    const { data } = await axios.get(`./locales/${language}/vocabulary_${language}.json.gz`, {
      responseType: 'arraybuffer',
      decompress: true,
    })

    const parsedData = JSON.parse(parse(data))

    const languageToStore: LanguagesStoreType = {
      data: parsedData,
      hash: md5(data),
      language,
    }

    await localforage.setItem(language, languageToStore)

    return JSON.parse(parse(data))
  } catch (err) {
    console.error(err)
  }
}
