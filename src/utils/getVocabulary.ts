import axios from 'axios'
import { strFromU8, decompressSync } from 'fflate'

import { Languages } from '../types/types'

export const getVocabulary = async (language: Languages) => {
  const parse = (bin: any) => {
    return strFromU8(decompressSync(new Uint8Array(bin)))
  }

  const { data } = await axios.get(`./locales/${language}/vocabulary_${language}.json.gz`, {
    responseType: 'arraybuffer',
    decompress: true,
  })

  return JSON.parse(parse(data))
}
