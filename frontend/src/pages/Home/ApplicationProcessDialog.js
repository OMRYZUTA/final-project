import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ContactsAndDocuments from './ContactsAndDocuments'
import DatePicker from './DatePicker'
import Dropdown from './DropDown'
import Contacts from './Contacts'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        width: 'fit-content',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ApplicationProcessDialog({ open, handleClose, applicationProcess }) {
    const [state, setState] = React.useState(false);
    const handleChange = (event) => {
        setState(event.target.checked);
    };


    return (
        <div>
            <Dialog fullWidth={true}
                maxWidth={'md'} onClose={() => {
                    handleClose();
                }} aria-labelledby="customized-dialog-title" open={open}>
                <Grid container alignItems="center" justify={'space-evenly'} direction={'row'}>
                    <Grid item md={6} align="center">
                        <Grid container justify={'flex-start'} direction={'column'} spacing={2}>
                            <Grid item >
                                <Grid container alignItems="center">
                                    <TextField id="standard-basic" label="Company Name" defaultValue={applicationProcess.position.company_name} />
                                </Grid>
                            </Grid>
                            <Grid item >
                                <Grid container alignItems="center">
                                    <TextField id="standard-basic" label="Job Title" defaultValue={applicationProcess.position.job_title} />
                                </Grid>
                            </Grid>
                            <Grid item >
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    Status:
                                    <Grid item> Applied</Grid>
                                    <Button >Close</Button>
                                </Grid>
                            </Grid>
                            <Grid item >
                                <Grid container alignItems="center">
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button>Contacts</Button>
                                        <Button>Notes</Button>
                                    </ButtonGroup>

                                </Grid>
                                <Grid item>
                                    <Grid container>
                                        <Contacts contact_set={applicationProcess.contact_set} ></Contacts>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify={'space-around'} direction={'column'}>
                            <Grid item>
                                <Grid container>
                                    <TextField id="standard-basic" label="City" defaultValue={applicationProcess.position.city} />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <TextField id="standard-basic" label="Job URL" defaultValue={applicationProcess.position.job_posting_URL} />
                                </Grid>
                            </Grid>
                            <Grid item><DatePicker /></Grid>
                            <Grid item><Dropdown /></Grid>
                            <Grid item><Dropdown /></Grid>
                            <Grid item>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Notes"
                                    multiline
                                    rowsMax={4}
                                /></Grid>
                            <Grid item >
                                <DialogActions>

                                    <Button autoFocus onClick={handleClose} color="primary">
                                        Save changes
                                    </Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Dialog>
        </div >
    );
}
