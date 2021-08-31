import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ProfilePicture from '../../resources/images/ProfilePhoto.jpg';
import CoverPhoto from '../../resources/images/CoverPhoto.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        backgroundImage: `url(${CoverPhoto})`,
        height: 300,
        backgroundSize: 'cover',

    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }, headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    profilePhoto: {
        width: "250px",
        padding: 20,
        borderRadius: "50% !important;"
    }
}));

export default function Cover() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.headerOptions}>
                <a href="/profile" >
                    <img className={classes.profilePhoto} src={ProfilePicture} alt="profile" />
                </a>
            </div>
        </div>
    );
}
