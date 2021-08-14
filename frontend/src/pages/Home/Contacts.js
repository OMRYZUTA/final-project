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

const Contacts = ({ contact_set, handleContactsChange }) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [Contacts, setContacts] = useState(contact_set);

    const handleListChange = (e) => {
        const old = Contacts[index];
        const updated = { ...old, [e.target.id]: e.target.value }
        const clone = [...Contacts];
        clone[index] = updated;
        setContacts(clone);
        handleContactsChange(e, clone);
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container >
                            <Button
                                disabled={0 === index}
                                onClick={() => {
                                    setIndex(index - 1);
                                }}>
                                {"<"}
                            </Button>
                            <Button
                                disabled={contact_set?.length - 1 === index}
                                onClick={() => {
                                    setIndex(index + 1);
                                }}>{">"}</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField
                                id="name"
                                label="Contact Name"
                                value={Contacts.length > 0 ?
                                    Contacts[index].name : ''}
                                onChange={handleListChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <TextField
                                id="phone_number1"
                                label="Contact Phone"
                                value={Contacts.length > 0 ?
                                    Contacts[index].phone_number1 : ''}
                                onChange={handleListChange} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField
                                id="email_address"
                                label="Contact Mail"
                                value={Contacts.length > 0 ?
                                    Contacts[index].email_address :
                                    ''}
                                onChange={handleListChange} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Contacts;