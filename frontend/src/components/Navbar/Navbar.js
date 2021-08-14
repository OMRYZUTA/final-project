import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../resources/images/logo.svg';
import ProfilePicture from '../../resources/images/ProfilePhoto.jpg';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        paddingLeft: "70px",
        paddingRight: "70px",
    },
    logo: {
        width: 90,
        padding: 10,
    },
    profilePhoto: {
        width: "80px",
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
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
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
                    <Grid container direction={'column'}>
                        <Logo className={classes.logo} />
                        <Typography>managing your job hunt</Typography>
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
                            <a href="/" >
                                <img className={classes.profilePhoto} src={ProfilePicture} alt="profile" onClick={() => handleButtonClick('/')} />
                            </a>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);