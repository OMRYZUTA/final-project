import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import Step from '@material-ui/core/Step';
import { StepButton } from '@material-ui/core';
import StepDialog from './StepDialog';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#c3fff5',//veryLightBlue
        padding: 5,
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

function renderStep(stage, classes, onClick) {
    const isInPast = new Date(stage.stage_date) < new Date();

    return (
        //  date - blue, future date pink
        <Step key={stage.id} active={!isInPast} >
            <StepButton onClick={() => onClick(stage)}>
                <StepLabel StepIconProps={{
                    classes: { root: classes.stepIconRoot }
                }}>
                    <div>{stage.event_type.name}</div>
                    <div fullWidth>{stage.stage_date}</div>
                </StepLabel>
            </StepButton>
        </Step>
    );
}

function StageStepper({ stages, onStepClick }) {
    const classes = useStyles();
    const stageDisplayLimit = stages.length > 7;
    const { root, scrollable } = classes;
    const className = stageDisplayLimit ? [scrollable, root] : root

    return (
        <Stepper nonLinear className={className}>
            {stages
                .sort((e1, e2) => new Date(e1.stage_date) - new Date(e2.stage_date))
                .map((stage, index) => {
                    return renderStep({ ...stage, key: index }, classes, onStepClick);
                })}
        </Stepper>
    );
}

export default function HorizontalStepper({
    stage_set,
    eventTypes,
    eventMedias,
    handleStagesChange,
    onDeleteStage }) {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState();
    const [isUpdate, setIsUpdate] = useState(true);

    const handleAddStep = useCallback(() => {
        setIsUpdate(false);
        setCurrentStep({
            event_type: { id: "CV", name: "cv sent" },
            event_media: { id: "EM", name: "email" },
        });
    }, [])

    const handleStepClick = useCallback((step) => {
        setIsUpdate(true);
        setCurrentStep(step);
    }, [])

    const handleStepDialogClose = useCallback((newStep) => {
        setCurrentStep();
    }, []);

    const handleStepDialogChange = useCallback((newStep) => {
        handleStagesChange(newStep, isUpdate);
        setCurrentStep();
    }, [handleStagesChange, isUpdate]);

    const hasSteps = stage_set.length;

    return (
        <div className={classes.root}>
            <Grid container direction="row" className={classes.container}>
                <IconButton onClick={handleAddStep}>
                    <AddIcon />
                </IconButton>
            </Grid>
            {hasSteps && <StageStepper stages={stage_set} onStepClick={handleStepClick} />}
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
