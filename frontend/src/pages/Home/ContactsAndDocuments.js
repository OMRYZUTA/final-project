import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const ContactsAndDocuments = () => {
    return (
        <div>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <PermContactCalendarIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Name" defaultValue={'flula'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <ContactPhoneIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Phone" defaultValue={'03-6512020'} />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item>
                    <Grid container direction={'row'} alignContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <ContactMailIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Contact Mail" defaultValue={'flula@gmail.com'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default ContactsAndDocuments