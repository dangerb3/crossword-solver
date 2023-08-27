import React, { Suspense, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CircularProgress, Container } from '@mui/material'

import './App.css'
import { AppHeader } from './components/AppHeader'
import Main from './components/Main'
import { languageNamesArray } from './constants/constants'
import { Languages } from './types/types'

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = useCallback(
    (language: Languages) => {
      i18n.changeLanguage(language)
    },
    [i18n]
  )

  const currentLanguage = useMemo(
    () => languageNamesArray.find((lang) => i18n.language.includes(lang)) || Languages.en,
    [i18n.language]
  )

  const fallbackComponent = useMemo(
    () => (
      <Container sx={{ margin: 'auto', textAlign: 'center' }}>
        <CircularProgress size={100} thickness={2} />
      </Container>
    ),
    []
  )

  return (
    <div className="App">
      <Suspense fallback={fallbackComponent}>
        <AppHeader changeLanguage={changeLanguage} locale={t} currentLanguage={currentLanguage} />
        <Main changeLanguage={changeLanguage} locale={t} currentLanguage={currentLanguage} />
      </Suspense>
    </div>
  )
}

export default App
