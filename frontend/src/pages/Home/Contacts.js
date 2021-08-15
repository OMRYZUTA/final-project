import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100%',
        width: '100%',
    },
    contacts: {
        height: '100%',
        width: '100%',
    },
}))


const Contacts = ({ contact_set }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction={'column'} className={classes.root}>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'} className={classes.contacts}>
                        <Grid item>
                            <PermContactCalendarIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Name" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].name : "contact name") : null}
                            />
                        </Grid>
                        {console.log(contact_set)}
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <ContactPhoneIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Phone" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].phone_number1 : "Phone Number") : null} />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <ContactMailIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Mail" defaultValue={contact_set ? (contact_set.length >= 1 ? contact_set[0].email_address : "contact name") : null} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Contacts