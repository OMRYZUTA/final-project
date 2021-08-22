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

export default function StepDialog({ initialStep, eventTypes, mediaTypes, handleClose, handleSave }) {
    const [step, setStep] = useState(initialStep);

    const handleEventTypeChange = useCallback((e) => {
        const newEventType = {
            id: e.target.value,
            name: e.target.name,
        }
        setStep({
            ...step,
            event_type: newEventType,
        });
    }, [step]);

    const handleMediaTypeChange = useCallback((event) => {
        setStep({
            ...step,
            eventMedia: event.target.value,
        });
    }, [step]);

    const handleDateChange = useCallback((event) => {
        setStep({
            ...step,
            date: event.target.value,
        });
    }, [step]);

    const handleNotesChange = useCallback((event) => {
        setStep({
            ...step,
            notes: event.target.value,
        });
    }, [step]);

    // const handleSave = useCallback(() => {
    //     onClose(step);
    // }, [step, onClose]);


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
                                currentValue={step.eventType}
                                keyPropName="id"
                                namePropName="name"
                                onChange={handleEventTypeChange}
                            />
                        </Grid>
                        <Grid item>
                            <DropDown
                                label={"Media Type"}
                                options={mediaTypes}
                                currentValue={step.mediaType}
                                keyPropName="id"
                                namePropName="name"
                                onChange={handleMediaTypeChange}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker date={step.date} onChange={handleDateChange} />
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
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}