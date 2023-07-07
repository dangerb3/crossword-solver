import { Autocomplete, CardContent, Divider, TextField } from '@mui/material'
import React, { SyntheticEvent, memo, useEffect, useState } from 'react'
import { ContentWrapper } from './Main.styled'
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { findWord } from '../utils/findWord';
import debounce from 'lodash.debounce';
import { TFunction } from 'i18next';
import { Languages } from '../types/types';
import { LanguagesStructure } from '../constants/constants';
import { strFromU8, decompressSync } from 'fflate';
import axios from 'axios';


type MainProps = {
  changeLanguage: (language: Languages) => void,
  locale: TFunction<"translation", undefined>,
  currentLanguage: Languages
}

const Main = memo(({ changeLanguage, locale, currentLanguage }: MainProps) => {
  const [vocabulary, setVocabulary] = useState([])
  const [targetWord, setTargetWord] = useState(['', 'о', ''])
  const [lettersKit, setLettersKit] = useState(["и", "и", "с", "с", "п", "а", "н", "е"])
  const [lettersKitInputValue, setLettersKitInputValue] = useState('')

  const [answerWords, setAnswerWords] = useState<string[]>([])

  useEffect(() => {
    const getVocabulary = async () => {
      const parse = (bin: any) => {
        return strFromU8(decompressSync(new Uint8Array(bin)));
      }

      const { data } = await axios.get(`./locales/${currentLanguage}/vocabulary_${currentLanguage}.json.gz`, {
        responseType: 'arraybuffer',
        decompress: true,
      });

      setVocabulary(JSON.parse(parse(data)))
    }

    getVocabulary()
  }, [])

  //TODO: sort imports

  useEffect(() => {
    const debouncedFindWord = debounce(() => {
      setAnswerWords(findWord(targetWord.map(item => item === '' ? '*' : item).toLocaleString().replaceAll(",", ""), lettersKit, vocabulary));
    }, 500);

    debouncedFindWord();
  }, [targetWord, lettersKit, vocabulary])

  //TODO: add english examples

  const handleChangeLettersKit = (e: SyntheticEvent<Element, Event>, value: string[]) => {
    setLettersKit(value)
  }

  const handleInputChangeLettersKit = (e: SyntheticEvent<Element, Event>, value: string) => {
    const validationRule = LanguagesStructure.get(currentLanguage)?.validation

    if ((validationRule && value.match(validationRule))) { setLettersKit(prev => [...prev, value]); setLettersKitInputValue('') }
  }

  // TODO: add responsiveness on desktop (reduce width)

  return (
    <div style={{ marginTop: '100px' }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%', margin: 'auto' }}
      >
        <TextField
          id="letters-count" // TODO: change input type
          label={locale("main.targetLettersCount")}
          variant="outlined"
          value={targetWord.length}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (value <= 17)
              setTargetWord(Array(Number(value)).fill(''))
          }}
          sx={{ marginBottom: '16px' }}
        />
        {/* <Autocomplete
          multiple
          id="letters-kit"
          options={russianAlphabet}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Буквы для составления слова" />
          )}
          value={lettersKit}
          onChange={(e, inputLetters) => setLettersKit(inputLetters)}
          sx={{ marginBottom: '16px' }}
        /> */}

        {/* <TextField
          id="letters-kit"
          label={locale('main.lettersKit')}
          variant="outlined"
          value={lettersKit}
          onChange={handleChangeLettersKit}
        /> */}

        <Autocomplete
          multiple
          id="letters-kit"
          options={[]}
          getOptionLabel={(option) => option}
          value={lettersKit}
          renderInput={(params) => (
            <TextField {...params} label={locale('main.lettersKit')} />
          )}
          onInputChange={handleInputChangeLettersKit}
          onChange={handleChangeLettersKit}
          inputValue={lettersKitInputValue}
          freeSolo
        />
      </CardContent>

      <ContentWrapper
        style={{ width: '100%', display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {targetWord.map((item, index) =>// TODO: validation: only words from letters kit can be here
          <TextField
            key={index}
            size='small'
            sx={{ width: '40px' }}
            value={targetWord[index]}
            onChange={(e) => setTargetWord(prev => {
              const value = e.target.value;
              if (value.length <= 1) {
                prev[index] = e.target.value;
              }
              return prev.slice()
            })}
          />
        )}
      </ContentWrapper>

      <Divider />

      <ContentWrapper style={{ margin: 'auto', width: '90%', marginTop: '22px' }}>
        {(answerWords?.length && !answerWords.every(item => item === '')) ?
          <Autocomplete
            multiple
            id="answer-words"
            options={[]}
            value={answerWords}
            readOnly
            renderInput={(params) => (
              <TextField {...params} label={locale('main.possibleAnswerWords')} />
            )}
            freeSolo
          />
          : null
        }
      </ContentWrapper>
    </div>
  )
})

export default Main