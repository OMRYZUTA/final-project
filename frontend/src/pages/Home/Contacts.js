import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const Contacts = ({ contact_set }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container>
                            <TextField id="standard-basic" label="Contact Name" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].name : "contact name") : null}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="standard-basic" label="Contact Phone" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].phone_number1 : "Phone Number") : null} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="standard-basic" label="Contact Mail" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].email_address : "contact name") : null} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

        </Card>
    );
}

export default Contacts;