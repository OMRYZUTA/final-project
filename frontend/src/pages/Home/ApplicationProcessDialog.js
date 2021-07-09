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
import PostAppProcess from '../../services/appprocesses/PostAppProcess'



const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ApplicationProcessDialog({ open, handleClose, applicationProcess }) {
    const [displayContacts, setDisplayContacts] = React.useState(true);
    const [currentApplication, setCurrentApplication] = React.useState(applicationProcess);
    const renderContactsOrNotes = () => {
        return (
            <div>
                {displayContacts ? <Contacts
                    contact_set={currentApplication.contact_set}
                    handleContactsChange={handleContactsChange}
                /> : <Notes
                    notes={currentApplication.position.about_the_job}
                    id={'about_the_job'}
                    handleChange={handlePositionChange
                    }
                />}
            </div>
        )
    }

    const handleChange = e => {
        setCurrentApplication({ ...currentApplication, [e.target.id]: e.target.value });
    }

    const handleSaveChanges = e => {
        console.log('application process: ', currentApplication);
        PostAppProcess(currentApplication);
        handleClose();
    }

    const handlePositionChange = e => {
        const position = { ...currentApplication.position, [e.target.id]: e.target.value }
        setCurrentApplication({ ...currentApplication, 'position': position });
    }
    const handleStagesChange = (e, new_stage_set) => {
        setCurrentApplication({ ...currentApplication, 'stage_set': new_stage_set });
    }
    const handleContactsChange = (e, new_contact_set) => {
        setCurrentApplication({ ...currentApplication, 'contact_set': new_contact_set })
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
                                            <TextField onChange={handlePositionChange}
                                                id="company_name" label="Company Name"
                                                type="text"
                                                defaultValue={applicationProcess.position.company_name}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        <Grid container alignItems="center">
                                            <TextField
                                                id="job_title"
                                                label="Job Title"
                                                defaultValue={applicationProcess.position.job_title}
                                                onChange={handlePositionChange} />
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            Status:
                                            <Grid item>
                                                <TextField
                                                    id={'status'}
                                                    defaultValue={applicationProcess.status}
                                                    onChange={handleChange}
                                                >
                                                </TextField>
                                            </Grid>
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
                                            <TextField
                                                id="city"
                                                label="City"
                                                defaultValue={currentApplication.position.city}
                                                onChange={handlePositionChange} />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <TextField
                                                id="job_posting_URL"
                                                label="Job URL"
                                                defaultValue={currentApplication.position.job_posting_URL}
                                                onChange={handlePositionChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Stages
                                                stage_set=
                                                {currentApplication.stage_set}
                                                handleStagesChange={handleStagesChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <DialogActions>
                                <Button variant="outlined"
                                    autoFocus
                                    onClick={handleSaveChanges}
                                    color="primary">
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
