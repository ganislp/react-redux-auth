import {createMuiTheme} from '@material-ui/core/styles';

const themeBlue ="#0B72B9";
const themeOrange = "#FFBA60";

export default createMuiTheme({
  palette: {
    common: {
      blue: `${themeBlue}`,
      orange: `${themeOrange}`
    },
    primary: {
      main: `${themeBlue}`
    },
    secondary: {
      main: `${themeOrange}`
    }
  },
})