import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    step: {
        backgroundColor: '#FFFFC5',//yellow
    },
    button: {
        backgroundColor: '#FFADE7',//pink
        margin: '5px',
    },
}));
export default function DeleteConfirmationAlert({ handleClose, headline, content, onOK }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.step}>{headline}</DialogTitle>
                <DialogContent className={classes.step}>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.step}>
                    <Button onClick={handleClose} className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={onOK} className={classes.button} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
