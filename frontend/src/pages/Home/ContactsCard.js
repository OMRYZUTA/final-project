import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'flex-start',
    }
}

));

const ContactsCard = ({ contact_set, handleContactsChange }) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [contacts, setContacts] = useState(contact_set);
    const [showAreYouSure, setShowAreYouSure] = React.useState(false);
    const [headline, setHeadline] = React.useState("");
    const [content, setContent] = React.useState("");
    const [onSure, setOnSure] = useState();

    const renderAreYouSure = (handleClose) => {
        return (
            <DeleteConfirmationAlert handleClose={handleClose} onOK={onSure} headline={headline} content={content} />
        )
    }
    const handleAreYouSureClose = useCallback(() => {
        setShowAreYouSure(false);
    });
    const onDeleteContact = useCallback(() => {
        setContacts(
            contacts.filter(contact => JSON.stringify(contact) !== JSON.stringify(contacts[index]))
        );
        setIndex(index === 0 ? 0 : index - 1);
        setShowAreYouSure(false);
    }, [contacts, index]);

    const onDelete = useCallback(() => {
        if (contacts.length > 0) {
            setOnSure(() => onDeleteContact);
            setContent("It will be permanently deleted.")
            setHeadline("Are you sure you'd like to delete the contact?");
            setShowAreYouSure(true);
        }
    }, [onDeleteContact, contacts]);

    const handleListChange = (e) => {
        const old = contacts[index];
        const updated = { ...old, [e.target.id]: e.target.value }
        const clone = [...contacts];
        clone[index] = updated;
        setContacts(clone);
        handleContactsChange(e, clone);
    }
    const handleAddContact = useCallback((e) => {
        const newContact = {
            email_address: "", name: "",
            phone_number1: ""
        }
        const clone = [...contacts, newContact];
        setContacts(clone);
        handleContactsChange(e, clone);
        setIndex(clone.length - 1);
    }, [contacts, handleContactsChange])


    return (
        <Grid container direction={'column'}>
            {showAreYouSure && renderAreYouSure(handleAreYouSureClose, onSure)}
            <Grid item>
                <Grid container >
                    <Button
                        disabled={0 === index}
                        onClick={() => {
                            setIndex(index - 1);
                        }}>
                        {"<"}
                    </Button>
                    <Button
                        disabled={contacts?.length === 0 || contacts?.length - 1 === index}
                        onClick={() => {
                            setIndex(index + 1);
                        }}>{">"}</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container>
                    <TextField
                        id="name"
                        label="Contact Name"
                        value={contacts.length > 0 ?
                            contacts[index].name : ''}
                        onChange={handleListChange}
                    />
                </Grid>
            </Grid>

            <Grid item>
                <Grid container>
                    <TextField
                        id="phone_number1"
                        label="Contact Phone"
                        value={contacts.length > 0 ?
                            contacts[index].phone_number1 : ''}
                        onChange={handleListChange} />
                </Grid>
            </Grid>
            <Grid item>
                <Grid container>
                    <TextField
                        id="email_address"
                        label="Contact Mail"
                        value={contacts.length > 0 ?
                            contacts[index].email_address :
                            ''}
                        onChange={handleListChange} />
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <IconButton onClick={handleAddContact}>
                    <AddIcon />
                </IconButton>
                <IconButton onClick={onDelete} disable={contacts.length < 0}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>

    );
}

export default ContactsCard;