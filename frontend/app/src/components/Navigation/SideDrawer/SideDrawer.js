import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const useStyles = makeStyles(theme => ({
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
