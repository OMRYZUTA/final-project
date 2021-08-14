import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function DropDown({
    label,
    options,      // an array of {key, value} pairs
    currentValue, // a single key value, must be a valid option
    keyPropName,  // the name of the "key" property from the pair
    namePropName, // the name of the "name" property from the pair
    onChange,     // callback function that notifies "outside" that the user selected a different options
}) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={currentValue}
                onChange={onChange}
            >
                {options.map((option) => <MenuItem id={option[keyPropName]} value={option[keyPropName]}>{option[namePropName]}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
