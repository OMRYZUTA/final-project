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

export default function StepDialog({ initialStep, eventTypes, mediaTypes, onClose }) {
    const [step, setStep] = useState(initialStep);

    const handleEventTypeChange = useCallback((event) => {
        setStep({
            ...step,
            eventType: event.target.value,
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

    const handleSave = useCallback(() => {
        onClose(step);
    }, [step, onClose]);

    const handleCancel = useCallback(() => onClose(), [onClose])

    const isNew = !step.id; // change any value to boolean true/false

    return (
        <Dialog open={true} onClose={handleCancel}>
            <DialogTitle>{isNew ? "Add Step" : "Edit Step"}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid container item direction={'column'}>
                        <Grid item>
                            <DropDown
                                label="Event Type"
                                options={eventTypes}
                                currentValue={step.eventType}
                                keyPropName="id"
                                valuePropName="name"
                                onChange={handleEventTypeChange}
                            />
                        </Grid>
                        <Grid item>
                            <DropDown
                                label="Media Type"
                                options={mediaTypes}
                                currentValue={step.mediaType}
                                keyPropName="id"
                                valuePropName="name"
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
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}