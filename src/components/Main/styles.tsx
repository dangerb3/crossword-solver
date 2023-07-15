import { CardContent, Container, IconButton } from '@mui/material'
import styled from 'styled-components'

export const ContentWrapper = styled('div')<{ margin?: boolean; wide?: boolean }>`
  padding: ${({ wide }) => (wide ? '0px 16px 16px 16px' : '0px 50px 16px 50px')};
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${({ margin }) => (margin ? '22px' : '0px')};
  position: relative;
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

export const StyledClearButton = styled(IconButton)<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  right: 10px;
`
