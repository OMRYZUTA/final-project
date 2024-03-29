import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    lightBlue: {
      backgroundColor: '#5FE2FF'
    },
    blurBlue: {
      backgroundColor: '#93f7ff'
    },
    veryLightBlue: {
      backgroundColor: '#c3fff5'
    },
    pink: {
      backgroundColor: '#FFADE7'
    },
    yellow: {
      backgroundColor: '#FFFFC5'
    },
    primary: { // Pink
      main: '#FFADE7'
    },
    secondary: {
      light: '#c3fff5',//veryLightBlue 
      dark: '#93F7FF',// blurBlue
      main: '#5FE2FF'// lightBlue
    },
    neutral: {// yellow 
      main: '#FFFFC5'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    colors: '#62737B',
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
          <Route
            exact
            from='/profile'
            render={props => <Profile />}
          />
          <Route exact path='/home' render={props => <Home {...props} className={classes.container} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
