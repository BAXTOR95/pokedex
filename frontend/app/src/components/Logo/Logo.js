import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import pokedexLogo from '../../assets/images/pokedex_logo.png';


const useStyles = makeStyles(theme => ({
    Logo: {
        padding: "8px",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "5px",
        "& img": {
            height: "50px"
        }
    }
}));

const Logo = (props) => {
    const classes = useStyles();

    return (
        <div className={ classes.Logo } >
            <img src={ pokedexLogo } alt="Pokedex" />
        </div>
    );
};

export default Logo;