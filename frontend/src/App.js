import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    //https://www.schemecolor.com/spiral-marshmallow-color-scheme.php
    // Pink Marshmallow #FFADE7
    // yellow #FFFFC5
    // darkBlue #5FE2FF
    // lightBlue #5FE2FF
    // blurBlue #93F7FF
    primary: {
      main: '#FFFFC5'
    },
    // secondary: ''
  },
  typography: {
    fontFamily: 'Roboto'
  },

})

const useStyles = makeStyles({
  container: {
    marginLeft: "100px",
    marginRight: "50px",
  }
});
export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router >
        <Navbar />
        <Switch>
          <Route
            exact
            from='/'
            render={props => <Home {...props} />}
          />
          <Route exact path='/home' render={props => <Home {...props} className={classes.container} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
