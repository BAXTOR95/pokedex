import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import NavigationItem from './NavigationItem/NavigationItem';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={ 0 }
        getContentAnchorEl={ null }
        anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'center',
        } }
        transformOrigin={ {
            vertical: 'top',
            horizontal: 'center',
        } }
        { ...props }
    />
));

const useStyles = makeStyles(theme => ({
    NavigationItems: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        height: "100%"
    },
    "@media (min-width: 500px)": {
        NavigationItems: {
            flexFlow: "row"
        }
    }
}));

const NavigationItems = (props) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (url) => {
        setAnchorEl(null);
        url && props.history.push(url);
    };

    return (
        <ul className={ classes.NavigationItems }>
            <NavigationItem link="/" exact>POKEDEX</NavigationItem>
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={ handleMenu }
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <StyledMenu
                    id="menu-appbar"
                    anchorEl={ anchorEl }
                    keepMounted
                    open={ open }
                    onClose={ handleClose }
                >
                    { !props.isAuthenticated ?
                        <MenuItem onClick={ () => handleClose("/auth") }>Login</MenuItem> :
                        <MenuItem onClick={ () => handleClose("/logout") }>Logout</MenuItem> }
                </StyledMenu>
            </div>
        </ul>
    );
};

export default withRouter(NavigationItems);