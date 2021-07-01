import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker'
import DropDown from './DropDown'
import { TextField } from '@material-ui/core';
import HandleListChange from '../../components/HandleListChange';
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

const Stages = ({ stage_set, handleChange, id }) => {

    const classes = useStyles();
    const [index, setIndex] = useState(stage_set ? (stage_set.length - 1) : 0);
    const [currentList, setCurrentList] = useState(stage_set);



    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction={'column'}>
                    <Grid item>Stages</Grid>
                    <Grid item>
                        <Grid container >
                            <Button
                                disabled={0 === index}
                                onClick=
                                {() => {
                                    setIndex(index - 1);
                                }}>
                                {"<"}
                            </Button>
                            <Button
                                disabled=
                                {stage_set?.length - 1 === index}
                                onClick=
                                {() => {
                                    setIndex(index + 1);
                                }}>
                                {">"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <TextField
                                type={'date'}
                                id={'date'}
                                defaultValue=
                                {currentList.length > 0 ?
                                    (currentList[index]).date
                                    : ''}
                            // onChange={() => {
                            //     e, listID, currentList, handleChange, index
                            // }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item><DropDown dropdownOptions={["cv sent", "initial interview", "HR interview", "team leader interview", "management interview", "offer received", "offer accepted", "offer rejected", "other"]} label={'Event'} /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item><DropDown dropdownOptions={["F2F", "video call", "Phone call", "Email", "Other"]} label={'Medium'} /></Grid>
                        </Grid>
                    </Grid>
                    {/* add notes field*/}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Stages;