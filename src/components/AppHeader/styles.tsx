import { Typography, MenuItem, Select, Box } from '@mui/material'
import styled, { keyframes } from 'styled-components'

export const StyledMenuItem = ({ ...props }) => (
  <MenuItem
    sx={{
      '& :nth-child(1)': { marginRight: '5px' },
    }}
    {...props}
  />
)

export const StyledBox = ({ ...props }) => (
  <Box
    sx={{
      '& :nth-child(1)': { marginRight: '5px' },
      display: 'flex',
      alignItems: 'center',
      paddingRight: '15px',
    }}
    {...props}
  />
)

export const StyledTypography = ({ ...props }) => (
  <Typography
    variant="h6"
    component="div"
    sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, color: 'white' }}
    {...props}
  />
)

export const StyledSelect = ({ ...props }) => (
  <Select
    labelId="select-lang-label"
    id="select-lang"
    size="small"
    variant="outlined"
    sx={{ border: '0px' }}
    {...props}
  />
)

export const appearAnimation = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1}
`

export const AnimatedText = styled('a')`
  opacity: 1;
  animation: ${appearAnimation} 1s ease-in forwards;
`
