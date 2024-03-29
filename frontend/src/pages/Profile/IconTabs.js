import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DescriptionIcon from '@material-ui/icons/Description';
import StarsIcon from '@material-ui/icons/Stars';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stats from './Stats'
import Documents from './Documents'
import Skills from './Skills'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "#FFFFC5", // yellow
    height: 500
  },
}));

export default function IconTabs({ stats }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {"Omry Zuta"}
          <Tab label="Documents" icon={<DescriptionIcon />} {...a11yProps(0)} />
          <Tab label="Stats" icon={<EqualizerIcon />} {...a11yProps(1)} />
          <Tab label="Skills" icon={<StarsIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Documents />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stats stats={stats} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Skills />
      </TabPanel>
    </div>
  );
}
