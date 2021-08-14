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
      main: '#FBF7EC'
    },
    // secondary: ''
  },
  typography: {
    fontFamily: 'Roboto'
  },
})

const useStyles = makeStyles({});
export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Router>
          <Navbar />
          <Switch>
            <Route
              exact
              from='/'
              render={props => <Home {...props} />}
            />
            <Route exact path='/home' render={props => <Home {...props} />} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}
