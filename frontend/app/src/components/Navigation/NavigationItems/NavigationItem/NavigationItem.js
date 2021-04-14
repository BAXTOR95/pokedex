import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {

    return (
        <ButtonBase>
            <li className={ classes.NavigationItem }>
                <NavLink
                    to={ props.link }
                    exact={ props.exact }
                    activeClassName={ classes.active }>{ props.children }</NavLink>
            </li>
        </ButtonBase>
    );
};

export default NavigationItem;