import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-poke-api';
import './Pokedex.css';

export const Pokedex = props => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default withErrorHandler(Pokedex, axios);