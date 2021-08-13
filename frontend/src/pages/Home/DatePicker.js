import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker({ date, onChange }) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                label="Date"
                type="date"
                value={date}
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={onChange}
            />
        </form>
    );
}
