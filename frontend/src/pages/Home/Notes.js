import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles({
    root: {
        minWidth: 100,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Notes = ({ notes, handleChange, id }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container>
                            <TextField
                                id={id}
                                label="Notes"
                                multiline
                                rowsMax={4}
                                defaultValue={notes}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
export default Notes;