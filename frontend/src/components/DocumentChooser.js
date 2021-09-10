import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { files, onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        const fixed_url = "http://127.0.0.1:8000" + value.file;
        onClose({ ...value, file: null, file_url: fixed_url });
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Select a document</DialogTitle>
            <List>
                {files.map((file) => (
                    <ListItem button onClick={() => handleListItemClick(file)} key={file.id}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <DescriptionIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={file.file_name} />
                    </ListItem>
                ))}


            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function DocumentChooser({ files, showFiles, handleClose }) {

    const [selectedFile, setSelectedFile] = React.useState(null);

    return (
        <SimpleDialog files={files} selectedValue={selectedFile} open={showFiles} onClose={handleClose} />
    );
}
