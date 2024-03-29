import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ProfilePicture from '../resources/images/ProfilePhoto.jpg';
import React from 'react';
import { ReactComponent as Logo } from '../resources/images/logo.svg';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        paddingLeft: "70px",
        paddingRight: "70px",
    },
    logo: {
        width: 300,
        paddingTop: 10,
    },
    profilePhoto: {
        width: "70px",
        padding: 20,
        borderRadius: "50% !important;"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
        }
    },
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
    }
}));

const Navbar = props => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const { history } = props;
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const menuItems = [
        {
            menuTitle: 'Home',
            pageURL: '/'
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position='static'>
                <Toolbar>
                    <Grid container direction='column' >
                        <a href="/" >
                            <Logo className={classes.logo} />
                        </a>
                    </Grid>
                    {isMobile ? (
                        <div>
                            <IconButton
                                edge='start'
                                className={classes.menuButton}
                                color='secondary'
                                aria-label='menu'
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map(menuItem => {
                                    const { menuTitle, pageURL } = menuItem;

                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </div>
                    ) : (
                        <div className={classes.headerOptions}>
                            <a href="/profile" >
                                <img className={classes.profilePhoto} src={ProfilePicture} alt="profile" />
                            </a>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);