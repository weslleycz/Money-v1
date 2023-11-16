import { createTheme } from '@mui/material/styles';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#252836',
      contrastText: '#39DC79',
    },
    error: {
      main: '#F93434',
      contrastText: '#ffff',
    },
    success: {
      main: '#39DC79',
      contrastText: '#ffff',
    },
    secondary: {
      main: '#39DC79',
      contrastText: '#252836',
    },
    background:{
      paper: '#1F1D2B',
    },
  },

});
