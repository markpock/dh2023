import { createTheme } from '@mui/material';
import { blue, common } from '@mui/material/colors';

// Create a dark mode theme
const darkTheme = createTheme({
  palette: {
    // type: 'dark', // Set the theme type to dark mode
    primary: {
      main: common.black, // Set primary background color to black
    },
    secondary: {
      main: blue[500], // Set secondary color to blue
    },
    text: {
      primary: common.white, // Set text color to white
    },
  },
  // You can customize other theme properties here, such as typography, spacing, etc.
  // For example:
  typography: {
    fontFamily: 'Roboto, sans-serif',
  }
});

export default darkTheme;
