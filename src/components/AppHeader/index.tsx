import React, { memo } from 'react'

import { Box, ListItemText, AppBar, Toolbar, SelectChangeEvent, Link } from '@mui/material'
import { TFunction } from 'i18next'

import { LanguagesStructure, languageNamesArray, languageObjectsArray } from '../../constants/constants'
import { Languages, LanguagesType } from '../../types/types'
import { StyledSelect, StyledBox, StyledMenuItem, StyledTypography, AnimatedText } from './styles'

type AppHeaderProps = {
  changeLanguage: (language: Languages) => void
  locale: TFunction<'translation', undefined>
  currentLanguage: Languages
}

export const AppHeader = memo(({ changeLanguage, currentLanguage }: AppHeaderProps) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <StyledTypography>
            <Link href={origin} color={'#FFF'} underline="none">
              <AnimatedText>Crossword Solver</AnimatedText>
            </Link>
          </StyledTypography>
          <StyledSelect
            value={currentLanguage ? LanguagesStructure.get(currentLanguage) : languageObjectsArray[0]}
            onChange={(e: SelectChangeEvent) => changeLanguage(e.target.value as Languages)}
            renderValue={(lang: LanguagesType) => (
              <StyledBox>
                <lang.flag />
                {lang.value}
              </StyledBox>
            )}
          >
            {languageObjectsArray.map((lang, index) => (
              <StyledMenuItem key={index} value={languageNamesArray[index]}>
                <lang.flag />
                <ListItemText primary={lang.value} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Toolbar>
      </AppBar>
    </Box>
  )
})
