import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import DropDown from './DropDown'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from "react";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    step: {
        backgroundColor: '#FFFFC5',//yellow
    },
    button: {
        backgroundColor: '#FFADE7',//pink
        margin: '5px',
    },
}));


export default function StepDialog({
    initialStep,
    eventTypes,
    eventMedias,
    handleClose,
    handleSave,
    onDeleteStage }) {
    const [step, setStep] = useState(initialStep);
    const classes = useStyles();

    const handleEventTypeChange = (e) => {
        const oneElementArray = eventTypes.filter(a => {
            return a.id === e.target.value;
        })

        const newEventType = oneElementArray[0]

        setStep({
            ...step,
            event_type: newEventType,
        });
    }

    const handleMediaTypeChange = (e) => {
        const oneElementArray = eventMedias.filter(a => {
            return a.id === e.target.value;
        })

        const newEventMedia = oneElementArray[0]

        setStep({
            ...step,
            event_media: newEventMedia,
        });
    }

    const handleDateChange = useCallback((event) => {
        setStep({
            ...step,
            stage_date: event.target.value,
        });
    }, [step]);

    const handleNotesChange = useCallback((event) => {
        setStep({
            ...step,
            notes: event.target.value,
        });
    }, [step]);


    const onSave = useCallback((e) => {
        handleSave(step);
    }, [step, handleSave]);

    const handleDelete = useCallback((e) => {
        onDeleteStage(step, handleClose);
    })
    const isNew = !step.id; // change any value to boolean true/false

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle className={classes.step}>{isNew ? "Add Step" : "Edit Step"} </DialogTitle>
            <DialogContent className={classes.step}>
                <Grid container >
                    <Grid container item direction={'column'}>
                        <Grid item>
                            <DropDown
                                label={"Event Type"}
                                options={eventTypes}
                                currentValue={step.event_type.id}
                                keyPropName="id"
                                namePropName="name"
                                onChange={handleEventTypeChange}
                            />
                        </Grid>
                        <Grid item>
                            <DropDown
                                label={"Media Type"}
                                options={eventMedias}
                                currentValue={step.event_media.id}
                                keyPropName="id"
                                namePropName="name"
                                onChange={handleMediaTypeChange}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker date={step.stage_date} onChange={handleDateChange} />
                        </Grid>
                    </Grid>
                    <Grid container item direction={'column'}>
                        <Grid item>
                            <TextField
                                label="Notes"
                                multiline
                                rowsMax={4}
                                defaultValue={step.notes}
                                onChange={handleNotesChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.step}>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
                <Button onClick={handleClose} className={classes.button}>
                    Cancel
                </Button>
                <Button onClick={onSave} className={classes.button}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}