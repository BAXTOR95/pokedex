import React from 'react';

import pokedexLogo from '../../assets/images/pokedex_logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={ classes.Logo } >
        <img src={ pokedexLogo } alt="Pokedex" />
    </div>
);

export default logo;