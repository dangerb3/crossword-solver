import React, { Suspense } from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import Main from './components/Main';
import { CircularProgress } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }


  return (
    <div className="App">
      <Suspense fallback={<CircularProgress />}>
        <AppHeader />
        <Main />
      </Suspense>

    </div>
  );
}

export default App;
