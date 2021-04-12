import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const BackdropCustom = (props) => {
    const classes = useStyles();

    return (
        props.show && <Backdrop className={ classes.backdrop } open={ props.show } onClick={ props.clicked }></Backdrop>
    );
};

export default BackdropCustom;