import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const useStyles = makeStyles(theme => ({
    Content: {
        margin: 0
    }
}));

const Layout = props => {
    const [ sideDrawerIsVisible, setSideDrawerIsVisible ] = useState(false);

    const classes = useStyles();

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={ props.isAuthenticated }
                drawerToggleClicked={ sideDrawerToggleHandler } />
            <SideDrawer
                isAuth={ props.isAuthenticated }
                open={ sideDrawerIsVisible }
                closed={ sideDrawerCloseHandler }
            />
            <main className={ classes.Content }>{ props.children }</main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);