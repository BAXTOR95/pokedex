import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerToggle: {
        width: "40px",
        height: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        boxSizing: "border-box",
        cursor: "pointer"
    },
    "@media (min-width: 500px)": {
        drawerToggle: {
            display: "none"
        }
    }
}));

const DrawerToggle = (props) => {
    const classes = useStyles();

    return (
        <div className={ classes.drawerToggle }>
            <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu" onClick={ props.clicked }>
                <MenuIcon />
            </IconButton>
        </div>
    );
};

export default DrawerToggle;