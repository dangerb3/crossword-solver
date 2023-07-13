import { CardContent, Container } from '@mui/material'
import styled from 'styled-components'

export const ContentWrapper = styled('div')<{ margin?: boolean }>`
  padding: 0px 16px 16px 16px;
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${({ margin }) => (margin ? '22px' : '0px')};
`

export const StyledContainer = ({ ...props }) => (
  <Container maxWidth="md" sx={{ marginTop: '5%', padding: 0 }} {...props} />
)

export const StyledCardContent = ({ ...props }) => (
  <CardContent
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
    {...props}
  />
)
