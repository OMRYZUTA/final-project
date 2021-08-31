import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Cover from './Cover';
import IconTabs from './IconTabs';
const useStyles = makeStyles((theme) => ({
    root: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 70px',
        backgroundColor: '#f7f7f9',//'#FFFFC5',
        spacing: 0,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "100vh",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
        backgroundColor: "#FFFFC5"
    },

}))

const Index = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container   >
            <Grid item style={{ width: "95%" }} >
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Cover />
                        <IconTabs />
                    </Paper>
                </div>
            </Grid>
        </Grid>
    )
}

export default Index;
