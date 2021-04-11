import React from 'react';

import pokeballLogo from '../../assets/images/Pokeball.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={ classes.Logo } >
        <img src={ pokeballLogo } alt="Pokedex" />
    </div>
);

export default logo;