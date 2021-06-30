import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Contacts from './Contacts'
import Notes from './Notes'
import Stages from './Stages'




const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ApplicationProcessDialog({ open, handleClose, applicationProcess }) {
    const [displayContacts, setDisplayContacts] = React.useState(true);
    const currentApplication = React.useRef(applicationProcess);

    const renderContactsOrNotes = () => {
        return (
            <div>
                {displayContacts ? <Contacts contact_set={currentApplication.current.contact_set} /> : <Notes notes={currentApplication.current.position.about_the_job} />}
            </div>
        )
    }

    return (
        <div>
            <Dialog fullWidth={true}
                maxWidth={'md'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container alignItems="center" justify={'space-evenly'} direction={'row'}>
                            <Grid item md={6} align="center">
                                <Grid container justify={'flex-start'} direction={'column'} spacing={2}>
                                    <Grid item >
                                        <Grid container alignItems="center">
                                            <TextField id="companyName" label="Company Name"
                                            type="text"
                                                value={currentApplication.current.position.company_name} />
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        <Grid container alignItems="center">
                                            <TextField id="standard-basic" label="Job Title" value={currentApplication.current.position.job_title} />
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            Status:
                                            <Grid item> Applied</Grid>
                                            <Button color="secondary" variant="contained">Close</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        <Grid container alignItems="center">
                                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                <Button id='ContactsButton' onClick={() => { setDisplayContacts(true) }} >Contacts</Button>
                                                <Button id='NotesButton' onClick={() => { setDisplayContacts(false) }}>Notes</Button>
                                            </ButtonGroup>
                                        </Grid>
                                        <Grid item>
                                            <Grid container>
                                                {renderContactsOrNotes()}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justify={'space-between'} direction={'column'}>
                                    <Grid item>
                                        <Grid container>
                                            <TextField id="standard-basic" label="City" value={currentApplication.current.position.city} />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <TextField id="standard-basic" label="Job URL" value={currentApplication.current.position.job_posting_URL} />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Stages stage_set={currentApplication.current.stage_set} />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <DialogActions>
                                <Button variant="outlined" autoFocus onClick={() => {
                                    handleClose();
                                    console.log('applicationProcess:', currentApplication.current)
                                }} color="primary">
                                    Save changes
                                </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
