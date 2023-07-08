import { Autocomplete, CardContent, CircularProgress, Container, Box, Divider, TextField, Typography } from '@mui/material'
import React, { SyntheticEvent, memo, useEffect, useMemo, useState } from 'react'
import { ContentWrapper } from './Main.styled'
import { findWord } from '../utils/findWord';
import debounce from 'lodash.debounce';
import { TFunction } from 'i18next';
import { Languages } from '../types/types';
import { LanguagesStructure } from '../constants/constants';
import { match, P } from 'ts-pattern';
import { getVocabulary } from '../utils/getVocabulary';

type MainProps = {
  changeLanguage: (language: Languages) => void,
  locale: TFunction<"translation", undefined>,
  currentLanguage: Languages
}

const Main = memo(({ changeLanguage, locale, currentLanguage }: MainProps) => {
  const [vocabulary, setVocabulary] = useState<string[]>([])
  const [targetWord, setTargetWord] = useState<string[]>([])
  const [lettersKit, setLettersKit] = useState<string[]>([])
  const [lettersKitInputValue, setLettersKitInputValue] = useState('')
  const [answerWords, setAnswerWords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const validationRule = useMemo(() => LanguagesStructure.get(currentLanguage)?.validation || new RegExp(/^.*$/), [currentLanguage])

  useEffect(() => {
    let localeLettersKit = []
    let localeTargetWord = []

    switch (currentLanguage) {
      case Languages.ru:
        console.log('RU')
        localeLettersKit = ["и", "и", "с", "с", "п", "а", "н", "е"];
        localeTargetWord = ['', 'о', ''];
        break;
      case Languages.en:
        localeLettersKit = ["g", "c", "i", "e", "n", "x", "t", "i",];
        localeTargetWord = ['', 'x', '', '', '', '', '', 'g'];
        break;
    }

    setIsLoading(true)
    setLettersKit(localeLettersKit)
    setTargetWord(localeTargetWord)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setVocabulary(await getVocabulary(currentLanguage))
      setIsLoading(false)
    })()
  }, [currentLanguage])

  useEffect(() => {
    return () => {
      setLettersKit([])
      setTargetWord([])
    }
  }, [currentLanguage])

  //TODO: sort imports

  useEffect(() => {
    const debouncedFindWord = debounce(() => {
      setIsLoading(true)
      setAnswerWords(findWord(targetWord.map(item => item === '' ? '*' : item).toLocaleString().replaceAll(",", ""), lettersKit, vocabulary));
      setIsLoading(false)
    }, 500);

    debouncedFindWord();
  }, [targetWord, lettersKit, vocabulary])

  const handleChangeLettersKit = (e: SyntheticEvent<Element, Event>, value: string[]) => {
    setLettersKit(value)
  }

  const handleInputChangeLettersKit = (e: SyntheticEvent<Element, Event>, value: string) => {
    if ((validationRule && value.match(validationRule))) { setLettersKit(prev => [...prev, value]); setLettersKitInputValue('') }
  }

  const isAnswerEmpty = useMemo(() => Boolean(!answerWords?.length || answerWords.every(item => item === '')), [answerWords])

  const Answer = useMemo(() =>
    () =>
      //@ts-ignore
      match([isLoading, isAnswerEmpty])
        .with(([true, true || false]), () =>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress disableShrink />
          </Box>
        )
        .with([false, false], () =>
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
        )
        .with([false, true], () =>
          <Typography sx={{ textAlign: "center" }}>{locale('main.nothingFound')}</Typography>
        )
        .otherwise(() =>
          null),
    [answerWords, locale, isLoading, isAnswerEmpty])

  return (
    <Container maxWidth="md" sx={{ marginTop: '5%', padding: 0 }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          id="letters-count"
          type="number"
          label={locale("main.targetLettersCount")}
          variant="outlined"
          value={targetWord.length || ''}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (value >= 0 && value <= 17)
              setTargetWord(Array(Number(value)).fill(''))
          }}
          sx={{ marginBottom: '16px' }}
        />

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
        {targetWord.map((item, index) =>
          <TextField
            key={index}
            size='small'
            sx={{ width: '40px' }}
            value={targetWord[index]}
            onChange={(e) => setTargetWord(prev => {
              const value = e.target.value;
              if (value.length <= 1 && (value.match(validationRule) || value === '')) {
                prev[index] = e.target.value;
              }
              return prev.slice()
            })}
          />
        )}
      </ContentWrapper>

      <Divider />

      <ContentWrapper style={{ marginTop: '22px' }}>
        <Answer />
      </ContentWrapper>
    </Container >
  )
})

export default Main