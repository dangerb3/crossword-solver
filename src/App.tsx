import React, { Suspense, useCallback, useMemo } from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import Main from './components/Main';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Languages } from './types/types';
import { languageNamesArray } from './constants/constants';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((language: Languages) => {
    i18n.changeLanguage(language)
  }, [i18n])

  const currentLanguage = useMemo(() => languageNamesArray.find(lang => i18n.language.includes(lang)) || Languages.en, [i18n.language])

  return (
    <div className="App">
      <Suspense fallback={<CircularProgress />}>
        <AppHeader changeLanguage={changeLanguage} locale={t} currentLanguage={currentLanguage} />
        <Main changeLanguage={changeLanguage} locale={t} currentLanguage={currentLanguage} />
      </Suspense>
    </div>
  );
}

export default App;
