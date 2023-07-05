import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Button, Drawer, OutlinedInput, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Languages } from '../types/types';
import { LanguagesStructure } from '../constants/constants';


export const AppHeader = memo(() => {
  const { t, i18n } = useTranslation();

  console.log(i18n.language)

  const languageNamesArray = Array.from(LanguagesStructure.keys())
  const languageObjectsArray = Array.from(LanguagesStructure.values())


  const currentLanguage = languageNamesArray.find(lang => i18n.language.includes(lang))

  console.log('CURRENT', currentLanguage, languageNamesArray)

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Button onClick={() => changeLanguage('ru')}>Change</Button>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Crossword Solver
          </Typography>
          <Box component='nav'>
            <Select
              labelId="select-lang-label"
              id="select-lang"
              value={currentLanguage ? LanguagesStructure.get(currentLanguage)?.value : languageObjectsArray[0].value}
              onChange={(e) => changeLanguage(e.target.value as string)}//TODO: improve types
              //TODO: render flag
              renderValue={(value) => (<>{value}</>)}
            >
              {languageObjectsArray.map((lang, index) => (
                <MenuItem key={index} value={languageNamesArray[index]} /* sx={{ display: 'flex', flexDirection: 'row' }} */>
                  <img src={lang.imgPath} width='15px' height='15px' alt='flag' />
                  &nbsp;&nbsp;
                  <ListItemText primary={lang.value} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
})