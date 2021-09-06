import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { StepButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import StepDialog from './StepDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        //width: '100%',
        backgroundColor: '#c3fff5',//veryLightBlue
        padding: 12,
        justifyContent: "space-between",
        alignContent: "space-around"
    },
    container: {
        justifyContent: 'flex-start',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    scrollable: {
        overflow: 'scroll',
    },
    stepIconRoot: {
        color: "#5FE2FF",
        "&.MuiStepIcon-active": {
            color: "#FFADE7"
        },
        "&.MuiStepIcon-completed": {
            color: "#5FE2FF"
        }
    },
}));

function renderEmptyState() {
    return (
        <Typography>baby steps...</Typography>
    );
}

function renderStep(event, classes, onClick) {
    const isInPast = new Date(event.stage_date) < new Date();
    return (
        //past date - blue, future date pink
        <Step key={event.id} active={!isInPast} >
            <StepButton onClick={() => onClick(event)}>
                <StepLabel StepIconProps={{
                    classes: { root: classes.stepIconRoot }
                }}>
                    <div>{event.event_type.name}</div>
                    <div fullWidth>{event.stage_date}</div>
                </StepLabel>
            </StepButton>
        </Step>
    );
}

function EventStepper({ events, onStepClick }) {
    const classes = useStyles();
    const manyEvents = events.length > 7;
    const { root, scrollable } = classes;
    const className = manyEvents ? [scrollable, root] : root
    return (
        <Stepper nonLinear className={className}>
            {events
                .sort((e1, e2) => new Date(e1.stage_date) - new Date(e2.stage_date))
                .map((event) => {
                    return renderStep(event, classes, onStepClick);
                })}
        </Stepper >
    );
}

export default function HorizontalStepper({ stage_set, eventTypes, eventMedias, handleStagesChange, onDeleteStage }) {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState();

    const handleAddStep = useCallback(() => {
        setCurrentStep({
            event_type: { id: "CV", name: "cv sent" },
            event_media: { id: "EM", name: "email" },
        });
    }, [])

    const handleStepDialogClose = useCallback((newStep) => {
        setCurrentStep();
    }, []);

    const handleStepDialogChange = useCallback((newStep) => {
        handleStagesChange(newStep);
        setCurrentStep();
    }, [handleStagesChange]);

    const hasSteps = stage_set.length;

    return (
        <div className={classes.root}>
            <Grid container direction="row" className={classes.container}>
                <IconButton onClick={handleAddStep}>
                    <AddIcon />
                </IconButton>
            </Grid>
            {hasSteps && <EventStepper events={stage_set} onStepClick={setCurrentStep} />}
            {!hasSteps && renderEmptyState()}
            {currentStep && <StepDialog
                onDeleteStage={onDeleteStage}
                initialStep={currentStep}
                eventTypes={eventTypes}
                eventMedias={eventMedias}
                handleClose={handleStepDialogClose}
                handleSave={handleStepDialogChange}
            />}
        </div>
    );
}
