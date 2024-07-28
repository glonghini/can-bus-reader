import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1680
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: {
          width: '100%'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
        color: 'primary',
        variant: 'filled',
        sx: {
          backgroundColor: '#0001'
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    }
  },
  spacing: 6
})