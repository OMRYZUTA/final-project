import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});
export default function App() {
  const classes = useStyles();
  return (
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
  );
}
