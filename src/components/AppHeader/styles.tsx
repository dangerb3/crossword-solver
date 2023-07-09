import { Typography, MenuItem, Select, Box } from "@mui/material";

export const StyledMenuItem = ({ ...props }) => (
  <MenuItem
    sx={{
      '& :nth-child(1)': { marginRight: '5px' },
    }}
    {...props}
  />
);

export const StyledBox = ({ ...props }) => (
  <Box
    sx={{
      '& :nth-child(1)': { marginRight: '5px' },
      display: 'flex', alignItems: 'center', paddingRight: '15px'
    }}
    {...props}
  />
);

export const StyledTypography = ({ ...props }) => (
  <Typography
    variant="h6"
    component="div"
    sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
    {...props}
  />
);

export const StyledSelect = ({ ...props }) => (
  <Select
    labelId="select-lang-label"
    id="select-lang"
    size='small'
    variant='outlined'
    sx={{ border: '0px' }}
    {...props}
  />
);