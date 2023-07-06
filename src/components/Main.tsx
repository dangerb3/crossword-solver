import { Autocomplete, CardContent, Divider, TextField } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { ContentWrapper } from './Main.styled'
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { findWord } from '../utils/findWord';
import vocabulary from '../vocabulary.json'
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

const Main = memo(() => {
  const [targetWord, setTargetWord] = useState(['', 'о', ''])
  const [lettersKit, setLettersKit] = useState(["и", "и", "с", "с", "п", "а", "н", "е"])

  const [answerWords, setAnswerWords] = useState<string[]>([])

  useEffect(() => {
    const debouncedFindWord = debounce(() => {
      setAnswerWords(findWord(targetWord.map(item => item === '' ? '*' : item).toLocaleString().replaceAll(",", ""), lettersKit, vocabulary));
    }, 500);

    debouncedFindWord();
  }, [targetWord, lettersKit])

  const { t, i18n } = useTranslation();

  //TODO: add english alphabet and examples
  const russianAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я']

  return (
    <div style={{ marginTop: '100px' }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '70%', margin: 'auto' }}
      >
        <TextField
          id="letters-count"
          label={t("main.targetLettersCount")}
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

        {/* TODO: add validation */}
        <TextField
          id="letters-kit"
          label={t('main.lettersKit')}
          variant="outlined"
          value={lettersKit}
          onChange={(e) => setLettersKit(e.target.value.split(','))}
        />

        {/* <Button
          onClick={() => {
            const words = findWord(targetWord.map(item => item === '' ? '*' : item).toLocaleString().replaceAll(",", ""), lettersKit, vocabulary)
            setAnswerWords(words)
          }}
        >
          {t('main.findButton')}
        </Button> */}
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
              if (value.length <= 1) {
                prev[index] = e.target.value;
              }
              return prev.slice()
            })}
          />
        )}
      </ContentWrapper>

      <Divider />

      <ContentWrapper style={{ margin: 'auto', width: '70%', marginTop: '22px' }}>
        {(answerWords?.length && !answerWords.every(item => item === '')) ?
          <Autocomplete
            multiple
            id="answer-words"
            options={[]}
            value={answerWords}
            readOnly
            renderInput={(params) => (
              <TextField {...params} label={t('main.possibleAnswerWords')} />
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