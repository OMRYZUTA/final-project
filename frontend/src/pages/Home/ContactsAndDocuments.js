import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const ContactsAndDocuments = ({ contact_set }) => {
    return (
        <div>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
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
export default ContactsAndDocuments