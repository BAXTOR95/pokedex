import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#dd082f",
        padding: "0 20px",
    },
    nav: {
        height: "100%"
    },
    logo: {
        height: "80%",
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    "@media (max-width: 499px)": {
        desktopOnly: {
            display: "none"
        }
    }
}));


const ToolbarCustom = (props) => {

    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <AppBar position="static" className={ classes.appBar }>
                <Toolbar>
                    <DrawerToggle clicked={ props.drawerToggleClicked } />
                    <div className={ classes.logo }>
                        <Logo />
                    </div>
                    <nav className={ classes.desktopOnly }>
                        <NavigationItems isAuthenticated={ props.isAuth } />
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );


    // <header className={ classes.Toolbar }>
    //     <DrawerToggle clicked={ props.drawerToggleClicked } />
    //     <div className={ classes.Logo }>
    //         <Logo />
    //     </div>
    //     <nav className={ classes.DesktopOnly }>
    //         <NavigationItems isAuthenticated={ props.isAuth } />
    //     </nav>
    // </header>
};

export default ToolbarCustom;