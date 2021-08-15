import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import StepDialog from './StepDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function renderEmptyState() {
    return (
        <Typography>baby steps...</Typography>
    )
}

function renderStepper(steps) {
    return (
        <Stepper>
            {steps
                .sort((s1, s2) => s1.date - s2.date)
                .map((stage) => {
                    return (
                        <Step key={stage.id}>
                            <StepLabel >{stage.event_type.name}{" "}{stage.stage_date}</StepLabel>
                        </Step>
                    );
                })}
        </Stepper>
    )
}


export default function HorizontalStepper({ stage_set }) {
    const classes = useStyles();
    const [steps, setSteps] = useState(stage_set);
    const [currentStep, setCurrentStep] = useState();

    const handleAddStep = useCallback(() => {
        setCurrentStep({
            eventType: '',
            mediaType: '',
        });
    }, [])
    const handleStepDialogClose = useCallback((newStep) => {
        setCurrentStep();
        if (newStep) {
            setSteps([...steps, newStep]);
        }
    }, [steps]);
    const eventTypes = [
        {
            id: '',
            name: 'none',
        },
        {
            id: 'CV',
            name: 'CV Sent',
        },
        {
            id: 'HI',
            name: 'HR Interview',
        }
    ];
    const mediaTypes = [
        {
            id: '',
            name: 'none',
        },
        {
            id: 'CV',
            name: 'CV Sent',
        },
        {
            id: 'FI',
            name: 'F2F',
        }
    ];

    const hasSteps = steps.length;

    return (
        <div className={classes.root}>
            <IconButton onClick={handleAddStep} className={classes.button}>
                <AddIcon />
            </IconButton>
            {hasSteps ? renderStepper(steps) : renderEmptyState()}
            {currentStep && <StepDialog
                initialStep={currentStep}
                eventTypes={eventTypes}
                mediaTypes={mediaTypes}
                onClose={handleStepDialogClose}
            />}
        </div>
    );
}
