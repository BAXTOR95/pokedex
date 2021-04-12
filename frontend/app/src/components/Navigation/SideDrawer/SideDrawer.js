import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
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

export default sideDrawer;
