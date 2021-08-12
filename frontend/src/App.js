import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    // secondary: ''
  },
  // typography: {
  //   fontFamily: 'Quicksand',
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // }
})

const useStyles = makeStyles({});
export default function App() {
  const classes = useStyles();
  return (<ThemeProvider theme={theme}>
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
