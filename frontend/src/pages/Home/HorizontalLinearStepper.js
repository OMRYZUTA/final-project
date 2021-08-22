import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import StepDialog from './StepDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        //width: '100%',
        backgroundColor: '#c3fff5',//veryLightBlue
    },
    container: {
        justifyContent: 'flex-start',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    step: {
        backgroundColor: '#FFADE7',//pink
    },
}));

function renderEmptyState() {
    return (
        <Typography>baby steps...</Typography>
    )
}

function RenderStepper(steps, classes) {
    return (
        <Stepper className={classes.root}>
            {steps
                .sort((s1, s2) => s1.date - s2.date)
                .map((stage) => {
                    return (
                        //past date - blue, future date pink
                        <Step key={stage.id} active={true}>
                            <StepLabel >
                                <div>{stage.event_type.name}</div>
                                <div>{stage.stage_date}</div>
                            </StepLabel>
                        </Step>
                    );
                })}
        </Stepper >
    )
}


export default function HorizontalStepper({ stage_set, eventTypes, eventMedias, handleStagesChange }) {
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
        console.log({ newStep })
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
            {hasSteps && RenderStepper(stage_set, classes)}
            {!hasSteps && renderEmptyState()}
            {currentStep && <StepDialog
                initialStep={currentStep}
                eventTypes={eventTypes}
                eventMedias={eventMedias}
                handleClose={handleStepDialogClose}
                handleSave={handleStepDialogChange}
            />}
        </div>
    );
}
