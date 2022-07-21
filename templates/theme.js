import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2e7d32',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'Roboto'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {},
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'rgb(211, 47, 47)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          verticalAlign: 'top',
        }
      }
    },
  },
});

export default theme;
