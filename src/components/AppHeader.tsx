import { Box, Typography, ListItemText, AppBar, Toolbar, Select, MenuItem, } from '@mui/material';
import React, { memo, } from 'react'
import { Languages } from '../types/types';
import { LanguagesStructure, languageNamesArray, languageObjectsArray } from '../constants/constants';
import { TFunction } from 'i18next';

type AppHeaderProps = {
  changeLanguage: (language: Languages) => void,
  locale: TFunction<"translation", undefined>,
  currentLanguage: Languages
}

export const AppHeader = memo(({ changeLanguage, currentLanguage }: AppHeaderProps) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            Crossword Solver
          </Typography> {/* TODO: LOGO CENTER */}
          <Select
            labelId="select-lang-label"
            id="select-lang"
            size='small'
            variant='outlined'
            sx={{ border: '0px', height: 'inherited' }}
            value={currentLanguage ? LanguagesStructure.get(currentLanguage) : languageObjectsArray[0]}
            onChange={(e) => changeLanguage(e.target.value as Languages)}
            renderValue={(lang) => (
              <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '15px' }}>
                <img src={lang.imgPath} style={{ marginRight: '5px' }} alt='flag' />
                {lang.value}
              </Box>
            )}
          >
            {languageObjectsArray.map((lang, index) => ( // TODO: add menu: lang, theme change and about
              <MenuItem key={index} value={languageNamesArray[index]}>
                <img src={lang.imgPath} style={{ marginRight: '5px', width: "15px", height: '15px' }} alt='flag' />
                <ListItemText primary={lang.value} />
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  );
})