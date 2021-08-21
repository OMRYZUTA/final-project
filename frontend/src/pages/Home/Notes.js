import React from 'react';
import TextField from '@material-ui/core/TextField';

const Notes = ({ notes, handleChange, id }) => {
    return (
        <TextField
            fullWidth={true}
            id={id}
            label="Notes"
            multiline
            rowsMax={10}
            defaultValue={notes}
            onChange={handleChange}
        />
    );
}

export default Notes;
