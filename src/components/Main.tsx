import { Autocomplete, Button, CardContent, Checkbox, Divider, TextField } from '@mui/material'
import React, { memo, useState } from 'react'
import { ContentWrapper } from './Main.styled'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { findWord } from '../utils/findWord';
import vocabulary from '../vocabulary.json'

const Main = memo(() => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [targetWord, setTargetWord] = useState(['', 'о', ''])
  const [lettersKit, setLettersKit] = useState(["и", "и", "с", "с", "п", "а", "н", "е"])
  const [answerWords, setAnswerWords] = useState<string[]>([])

  const russianAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я']

  return (
    <div style={{ marginTop: '100px' }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '70%', margin: 'auto' }}
      >
        <TextField
          id="letters-count"
          label="Количество букв в слове"
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
          label="Буквы для составления слова (через запятую)"
          variant="outlined"
          value={lettersKit}
          onChange={(e) => setLettersKit(e.target.value.split(','))}
          sx={{ marginBottom: '16px' }}
        />

        <Button
          onClick={() => {
            const words = findWord(targetWord.map(item => item === '' ? '*' : item).toLocaleString().replaceAll(",", ""), lettersKit, vocabulary)
            setAnswerWords(words)
          }}
        >
          Найти
        </Button>
      </CardContent>

      <Divider />

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

      <ContentWrapper style={{ margin: 'auto', width: '70%' }}>
        {(answerWords.length) ?
          <Autocomplete
            multiple
            id="answer-words"
            options={[]}
            value={answerWords}
            readOnly
            renderInput={(params) => (
              <TextField {...params} label="Возможные слова" />
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