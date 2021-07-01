import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

const Contacts = ({ contact_set, handleChange }) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const currentContact = contact_set[index];

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container >
                            <Button disabled={0 === index} onClick={() => {
                                setIndex(index - 1);
                            }}>{"<"}</Button>
                            <Button disabled={contact_set?.length - 1 === index} onClick={() => {
                                setIndex(index + 1);
                            }}>{">"}</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField 
                            id="name" 
                            label="Contact Name" 
                            defaultValue={currentContact?.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="phone" label="Contact Phone" value={currentContact ? currentContact.phone_number1 : null} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="mail" label="Contact Mail" value={currentContact ? currentContact.email_address : null} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Contacts;