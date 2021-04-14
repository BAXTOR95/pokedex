import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const useStyles = makeStyles(theme => ({
    SideDrawer: {
        position: "fixed",
        width: "280px",
        maxWidth: "70%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: theme.zIndex.drawer,
        backgroundColor: theme.palette.common.white,
        padding: "32px 16px",
        boxSizing: "border-box",
        transition: "transform 0.3s ease-out",
    },
    "@media (min-width: 500px)": {
        SideDrawer: {
            display: "none"
        }
    },
    Open: {
        transform: "translateX(0)",
    },
    Close: {
        transform: "translateX(-100%)",
    },
    Logo: {
        height: "11%",
        marginBottom: "32px",
    }
}));

const SideDrawer = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Drawer anchor="left" open={ props.open } onClose={ props.closed }>
                <div className={ classes.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={ props.isAuth } />
                </nav>
            </Drawer>
        </React.Fragment>
    );
};

export default SideDrawer;
