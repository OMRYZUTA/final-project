import React, { useCallback, useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import DatePicker from './DatePicker'
import DropDown from './DropDown'

export default function StepDialog({ initialStep, eventTypes, eventMedias, handleClose, handleSave }) {
    const [step, setStep] = useState(initialStep);


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

    const isNew = !step.id; // change any value to boolean true/false

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>{isNew ? "Add Step" : "Edit Step"}</DialogTitle>
            <DialogContent>
                <Grid container>
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
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}