import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles({
    root: {
        minWidth: 100,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Stages = ({ stage_set }) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    console.log(index);
    const currentStage = stage_set[index];
    console.log(currentStage);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Grid container >
                            <Button disabled={0 === index} onClick={() => {
                                setIndex(index - 1);
                            }}>{"<"}</Button>
                            <Button disabled={stage_set?.length - 1 === index} onClick={() => {
                                setIndex(index + 1);
                            }}>{">"}</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="date" label="Date" value={currentStage?.date}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="eventType" label="Event" value={currentStage ? currentStage.event_type : null} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField id="eventMedia" label="By" value={currentStage ? currentStage.event_media : null} />
                        </Grid>
                    </Grid>
                    {/* add notes field*/}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Stages;